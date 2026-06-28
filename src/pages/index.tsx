import { GetStaticProps } from "next";
import { apolloClient } from "@/lib/apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";
import Layout from "@/components/Layout/Layout";
import Hero from "@/components/Hero/Hero";
import UspStrip from "@/components/UspStrip/UspStrip";
import Faq from "@/components/Faq/Faq";
import CategoryShowcase from "@/components/CategoryShowcase/CategoryShowcase";

type HomeProps = {
  categories: CategoriesQuery;
};

export default function Home({ categories }: HomeProps) {
  return (
    <Layout categories={categories.categories}>
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
