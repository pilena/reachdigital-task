import {
  ProductDocument,
  ProductQuery,
  ProductQueryVariables,
} from "@/generated/graphql";
import { apolloClient } from "../apolloClient";

export function getProduct(urlKey: string) {
  return apolloClient.query<ProductQuery, ProductQueryVariables>({
    query: ProductDocument,
    variables: { urlKey },
    fetchPolicy: "no-cache",
  });
}
