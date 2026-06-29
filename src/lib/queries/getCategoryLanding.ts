import { apolloClient } from "@/lib/apolloClient";
import {
  CategoryLandingDocument,
  CategoryLandingQuery,
  CategoryLandingQueryVariables,
} from "@/generated/graphql";

export async function getCategoryLanding(urlKey: string) {
  const { data } = await apolloClient.query<
    CategoryLandingQuery,
    CategoryLandingQueryVariables
  >({
    query: CategoryLandingDocument,
    variables: { urlKey },
  });

  return data;
}
