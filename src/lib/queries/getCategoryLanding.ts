import { apolloClient } from "@/lib/apolloClient";
import {
  CategoryLandingDocument,
  CategoryLandingQuery,
  CategoryLandingQueryVariables,
} from "@/generated/graphql";

export async function getCategoryLanding(urlPath: string) {
  const { data } = await apolloClient.query<
    CategoryLandingQuery,
    CategoryLandingQueryVariables
  >({
    query: CategoryLandingDocument,
    variables: { urlPath },
  });

  return data;
}
