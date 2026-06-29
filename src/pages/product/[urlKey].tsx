import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { apolloClient } from "@/lib/apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";
import { getProduct } from "@/lib/queries/getProduct";
import { getHomepageProducts } from "@/lib/queries/getHomepageProducts";
import { mapProduct } from "@/lib/mapProduct";
import { ProductDetail as ProductDetailType } from "@/types/productDetail";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/common/Seo";
import ProductDetail from "@/components/product/ProductDetail";

const SITE_URL = "https://reachdigital-task.vercel.app";

const notNull = <T,>(x: T): x is NonNullable<T> => x != null;

type ProductPageProps = {
  product: ProductDetailType;
  categories: CategoriesQuery["categories"];
};

export default function ProductPage({ product, categories }: ProductPageProps) {
  const canonical = `${SITE_URL}/product/${product.urlKey}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    image: product.images.map((i) => i.url),
    description: product.metaDescription ?? undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.stockStatus === "OUT_OF_STOCK"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: canonical,
    },
  };

  return (
    <Layout categories={categories}>
      <Seo
        title={product.metaTitle ?? product.name}
        description={
          product.metaDescription ?? `Shop ${product.name} at our store.`
        }
        canonical={canonical}
        ogImage={product.images[0]?.url}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <ProductDetail
        product={product}
        breadcrumbs={[
          { name: "Home", href: "/" },
          ...(product.category
            ? [
                {
                  name: product.category.name,
                  href: `/${product.category.urlPath}`,
                },
              ]
            : []),
          { name: product.name, href: `/product/${product.urlKey}` },
        ]}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getHomepageProducts();
  const paths = (data.products?.items ?? [])
    .filter(notNull)
    .map((p) => p.url_key)
    .filter(notNull)
    .map((urlKey) => ({ params: { urlKey } }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  const urlKey = params?.urlKey as string;

  const [productRes, categoriesRes] = await Promise.all([
    getProduct(urlKey),
    apolloClient.query<CategoriesQuery>({ query: CategoriesDocument }),
  ]);

  const item = (productRes.data.products?.items ?? []).filter(notNull)[0];
  if (!item) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: {
      product: mapProduct(item),
      categories: categoriesRes.data.categories,
    },
    revalidate: 60,
  };
};
