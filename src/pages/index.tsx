import { GetStaticProps } from "next";
import { apolloClient } from "@/lib/apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";
import Layout from "@/components/Layout/Layout";
import Hero from "@/components/Hero/Hero";
import UspStrip from "@/components/UspStrip/UspStrip";
import Faq from "@/components/Faq/Faq";
import CategoryShowcase from "@/components/CategoryShowcase/CategoryShowcase";
import Seo from "@/components/Seo/Seo";
import { getHomepageProducts } from "@/lib/queries/getHomepageProducts";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import { Product } from "@/types/product";

type HomeProps = {
  categories: CategoriesQuery;
  products: Product[];
};

export default function Home({ categories, products }: HomeProps) {
  return (
    <Layout categories={categories.categories}>
      <Seo
        title="Home"
        description="Discover the latest fashion collection for women, men, and kids. Free shipping over $50, easy 30-day returns."
      />
      <Hero />
      <UspStrip />
      <ProductCarousel title="Latest Designs" products={products} />
      <CategoryShowcase categories={categories.categories} />
      <Faq />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [categoriesData, productsData] = await Promise.all([
    apolloClient.query<CategoriesQuery>({ query: CategoriesDocument }),
    getHomepageProducts(),
  ]);

  const products = (productsData.products?.items ?? []).filter(
    (item): item is NonNullable<typeof item> => item != null,
  );

  return {
    props: {
      categories: categoriesData.data,
      products,
    },
    revalidate: 60,
  };
};
