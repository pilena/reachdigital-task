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
import { SITE_URL } from "@/lib/config";
import { notNull } from "@/lib/utils";
import Container from "@mui/material/Container";
import ProductCarousel from "@/components/product/ProductCarousel";
import { getCategoryProducts } from "@/lib/queries/getCategoryProducts";
import { Product } from "@/types/product";

type ProductPageProps = {
  product: ProductDetailType;
  categories: CategoriesQuery["categories"];
  relatedProducts: Product[];
};

export default function ProductPage({
  product,
  categories,
  relatedProducts,
}: ProductPageProps) {
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

      {relatedProducts.length > 0 && (
        <Container maxWidth="lg">
          <ProductCarousel
            title="Similar products"
            products={relatedProducts}
          />
        </Container>
      )}
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

  const product = mapProduct(item);

  let relatedProducts: Product[] = [];
  if (product.categoryUid) {
    const rel = await getCategoryProducts({
      filter: { category_uid: { eq: product.categoryUid } },
      pageSize: 13, // 12 + the current product we'll drop
      currentPage: 1,
    });
    relatedProducts = (rel.products?.items ?? [])
      .filter(notNull)
      .filter((p) => p.uid !== product.uid) // exclude the product itself
      .slice(0, 12);
  }

  return {
    props: {
      product,
      categories: categoriesRes.data.categories,
      relatedProducts,
    },
    revalidate: 60,
  };
};
