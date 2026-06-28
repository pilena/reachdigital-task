import { apolloClient } from "../apolloClient";
import { CategoriesDocument, CategoriesQuery } from "@/generated/graphql";

export async function getCategories() {
  const { data } = await apolloClient.query<CategoriesQuery>({
    query: CategoriesDocument,
  });

  return data;
}
