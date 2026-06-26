import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://backend.reachdigital.dev/graphql",
  cache: new InMemoryCache(),
});
