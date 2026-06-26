import { GetStaticProps } from 'next';
import { apolloClient } from '@/lib/apolloClient';
import { CategoriesDocument, CategoriesQuery } from '@/generated/graphql';

type HomeProps = {
  categories: CategoriesQuery;
};

export default function Home({ categories }: HomeProps) {
  const rootCategories = categories?.categories?.items?.[0]?.children ?? [];

  return (
    <div>
      <h1>Categories test</h1>
      <ul>
        {rootCategories.map((category) => (
          <li key={category?.id}>
            {category?.name}
            {category?.children && category.children.length > 0 && (
              <ul>
                {category.children.map((sub) => (
                  <li key={sub?.id}>{sub?.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
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