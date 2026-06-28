import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://backend.reachdigital.dev/graphql",
  }),
  cache: new InMemoryCache(),
});
