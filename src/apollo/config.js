import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { requestAccessToken } from '../utils/helpers/msal-helper';
import { setContext } from '@apollo/client/link/context';
import { ACCELERATE_APIS } from '../api/config';
import { env } from 'next-runtime-env';

export function createApolloClient() {
  const isBrowser = typeof window !== 'undefined';

  // Http Link
  const httpLink = new createUploadLink({
    uri: env('NEXT_PUBLIC_APOLLO_URL'),
    credentials: 'same-origin',
    headers: {
      'Apollo-Require-Preflight': 'true',
      'client-name': `Web App [web]`,
      'client-version': `1.0.0`,
      lang: 'en',
    },
  });

  const withToken = setContext(async (_, { headers }) => {
    const token = await requestAccessToken(ACCELERATE_APIS.apollo.scopes);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  // Error Link
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, extensions, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, extensions:${extensions?.code} Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        try {
          JSON.parse(networkError.bodyText);
        } catch (e) {
          networkError.message = networkError.bodyText;
          console.log(networkError.message);
        }
        console.log(`[Network error]: ${networkError}`);
      }
      return forward(operation);
    }
  );

  // Cache Policy
  const cache = new InMemoryCache({
    typePolicies: {},
  });

  return new ApolloClient({
    ssrMode: !isBrowser,
    link: from([errorLink, withToken, httpLink]),
    cache: cache,
    credentials: 'include',
  });
}

export default createApolloClient();
