import { GetStaticProps } from "next";
import { apolloClient } from "@/lib/apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";
import Layout from "@/components/Layout/Layout";
import Hero from "@/components/Hero/Hero";
import UspStrip from "@/components/UspStrip/UspStrip";
import Faq from "@/components/Faq/Faq";
import CategoryShowcase from "@/components/CategoryShowcase/CategoryShowcase";
import Seo from "@/components/Seo/Seo";

type HomeProps = {
  categories: CategoriesQuery;
};

export default function Home({ categories }: HomeProps) {
  return (
    <Layout categories={categories.categories}>
      <Seo
        title="Home"
        description="Discover the latest fashion collection for women, men, and kids. Free shipping over $50, easy 30-day returns."
      />
      <Hero />
      <UspStrip />
      <CategoryShowcase categories={categories.categories} />
      <Faq />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await apolloClient.query<CategoriesQuery>({
    query: CategoriesDocument,
  });

  return {
    props: {
      categories: data,
    },
    revalidate: 60,
  };
};
