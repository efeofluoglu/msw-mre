import { AZURE_APP_REG_CLIENT_IDS } from '../auth/msal-config';
import urljoin from 'url-join';
import { env } from 'next-runtime-env';

const formatApiUrl = (url: string | undefined) => {
  if (!url) {
    return null;
  }

  // append trailing / if missing
  return urljoin(url, '/');
};

export const ACCELERATE_APIS = {
  microsoftGraph: {
    url: formatApiUrl('https://graph.microsoft.com/v1.0'),
    scopes: ['https://graph.microsoft.com/User.Read'],
  },
  notifications: {
    url: formatApiUrl(env('NEXT_PUBLIC_WS_URL')),
    scopes: [
      `api://${AZURE_APP_REG_CLIENT_IDS.notifications}/PlatformBackend.ReadWrite`,
    ],
  },
  search: {
    url: formatApiUrl(env('NEXT_PUBLIC_SEARCH_API_URL')),
    scopes: [`api://${AZURE_APP_REG_CLIENT_IDS.search}/Search.ReadWrite`],
  },
  searchws: {
    url: formatApiUrl(env('NEXT_PUBLIC_SEARCH_WS_URL')),
    scopes: [`api://${AZURE_APP_REG_CLIENT_IDS.search}/Search.ReadWrite`],
  },
  faq: {
    url: formatApiUrl(env('NEXT_PUBLIC_API_URL')),
    scopes: [
      `api://${AZURE_APP_REG_CLIENT_IDS.backend}/PlatformBackend.ReadWrite`,
    ],
  },
  apollo: {
    url: formatApiUrl(env('NEXT_PUBLIC_APOLLO_URL')),
    scopes: [
      // Todo: Fix this so that we use one token scope for all graphQL queries
      `api://${AZURE_APP_REG_CLIENT_IDS.apollo}/Quizzes.ReadWrite`,
      `api://${AZURE_APP_REG_CLIENT_IDS.apollo}/Graphql.ReadWrite`,
      // `api://${AZURE_APP_REG_CLIENT_IDS.faq}/default`,
    ],
  },
  knowledgehub: {
    url: formatApiUrl(env('NEXT_PUBLIC_KNOWLEDGEHUB_URL')),
    scopes: [`api://${AZURE_APP_REG_CLIENT_IDS.knowledgehub}/DocsAsCodeAPI.*`],
  },
  // put backend as the last API to check to avoid matching with 2 services
  // and defaulting to the backend
  backend: {
    url: formatApiUrl(env('NEXT_PUBLIC_API_URL')),
    scopes: [
      `api://${AZURE_APP_REG_CLIENT_IDS.backend}/PlatformBackend.ReadWrite`,
    ],
  },
};

export function getApiScopes(uri: string) {
  return (
    Object.values(ACCELERATE_APIS).filter(
      (api: { url: string | null; scopes: string[] }) =>
        uri.includes(api?.url ?? '-1')
    )?.[0]?.scopes || ACCELERATE_APIS.backend.scopes
  );
}
