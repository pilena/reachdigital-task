import {
  CategoryProductsDocument,
  CategoryProductsQuery,
  CategoryProductsQueryVariables,
} from "@/generated/graphql";
import { apolloClient } from "../apolloClient";

export async function getCategoryProducts(
  variables: CategoryProductsQueryVariables,
) {
  const { data } = await apolloClient.query<
    CategoryProductsQuery,
    CategoryProductsQueryVariables
  >({
    query: CategoryProductsDocument,
    variables,
    fetchPolicy: "no-cache",
  });
  return data;
}
