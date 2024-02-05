import { expect, afterEach } from 'vitest';
import dotenv from 'dotenv';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userProfile from './src/test/data/userProfile';
import 'whatwg-fetch';
import { createSerializer } from '@emotion/jest';
import { mswServer } from './src/api/msw-server';
dotenv.config();

// add @emotion snapshot serializer
expect.addSnapshotSerializer(createSerializer());

// setup mocks
const account = { name: 'mockname', username: 'mockusername' };

vi.mock('./src/utils/helpers/msal-helper', () => ({
  requestAccessToken: vi.fn().mockResolvedValue('mockbackendtoken'),
  handleLogin: vi.fn().mockReturnValueOnce({}),
  msalInstance: {
    getAllAccounts: vi.fn().mockReturnValue([account]),
  },
}));

vi.mock('@azure/msal-node', () => ({
  ConfidentialClientApplication: vi.fn(() => ({
    acquireTokenByClientCredential: vi.fn(() => ({
      accessToken: 'mockedAccessToken',
    })),
  })),
}));

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('../hooks/use-user', () => ({
  useUser: vi.fn().mockReturnValue(userProfile),
}));
vi.mock('../hooks/use-is-authenticated', () => ({
  useIsAuthenticated: vi.fn().mockReturnValue({
    email: account.username,
    isAuthenticated: true,
    account: account,
  }),
}));

beforeAll(() => {
  mswServer.listen();
});
afterAll(() => {
  mswServer.close();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => {
        return;
      },
      removeListener: () => {
        return;
      },
    };
  };
