import {
  CategoryMetaDocument,
  CategoryMetaQuery,
  CategoryMetaQueryVariables,
} from "@/generated/graphql";
import { apolloClient } from "../apolloClient";

export async function getCategoryMeta(urlKey: string) {
  const { data } = await apolloClient.query<
    CategoryMetaQuery,
    CategoryMetaQueryVariables
  >({
    query: CategoryMetaDocument,
    variables: { urlKey },
  });

  return data;
}
