import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '../apollo/config';

export const apolloClient = createApolloClient();

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);
