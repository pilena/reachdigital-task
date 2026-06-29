import { apolloClient } from "@/lib/apolloClient";
import {
  HomepageProductsDocument,
  HomepageProductsQuery,
} from "@/generated/graphql";

export async function getHomepageProducts() {
  const { data } = await apolloClient.query<HomepageProductsQuery>({
    query: HomepageProductsDocument,
  });
  return data;
}
