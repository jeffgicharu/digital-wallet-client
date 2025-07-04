import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql", // The backend endpoint
});

// This authLink middleware will add the token to the headers
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('authToken');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Chain the authLink and httpLink together
const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;