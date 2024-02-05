import { env } from 'next-runtime-env';

export const tenantID =
  env('NEXT_PUBLIC_AZURE_TENANT_ID') || 'ea80952e-a476-42d4-aaf4-5457852b0f7e';

export const AZURE_APP_REG_CLIENT_IDS = {
  backend:
    env('NEXT_PUBLIC_AZURE_BACKEND_CLIENT_ID') ||
    '6231fd36-f74d-4aab-b9ae-c4dea7b1a4fa',
  notifications:
    env('NEXT_PUBLIC_AZURE_BACKEND_CLIENT_ID') ||
    '6231fd36-f74d-4aab-b9ae-c4dea7b1a4fa',
  search:
    env('NEXT_PUBLIC_AZURE_SEARCH_CLIENT_ID') ||
    'd603d7b2-0f28-4f0c-af21-75f776570dee',
  features:
    env('NEXT_PUBLIC_AZURE_FEATURES_CLIENT_ID') ||
    'f896ccfa-91f0-47c7-bdc1-dd9c182be258',
  faq:
    env('NEXT_PUBLIC_AZURE_FAQ_CLIENT_ID') ||
    '4f47bd61-320e-4b9e-b366-e6178df22b74',
  apollo:
    env('NEXT_PUBLIC_APOLLO_CLIENT_ID') ||
    'f2b45481-d724-42e7-9dfa-401bc6e6d11f',
  knowledgehub:
    env('NEXT_PUBLIC_KNOWLEDGEHUB_CLIENT_ID') ||
    'a93d1f80-ab04-486f-8061-7ea8533085a6',
};

export const msalConfig = {
  auth: {
    clientId:
      env('NEXT_PUBLIC_AZURE_CLIENT_ID') ||
      'ff8a35bd-11fa-4284-b5e0-79c03d2d3ffa',
    authority: `https://login.microsoftonline.com/${tenantID}`,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
