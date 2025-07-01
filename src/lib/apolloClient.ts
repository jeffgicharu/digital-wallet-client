import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8080/graphql", // The backend endpoint from the project brief 
  }),
  cache: new InMemoryCache(),
});

export default client;
