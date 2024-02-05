// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createSerializer } from '@emotion/jest';
import dotenv from 'dotenv';
import { TextEncoder, TextDecoder } from 'util';
// import { useIsAuthenticated as checkIsAuthenticated } from '@azure/msal-react';
import {
  requestAccessToken,
  msalInstance,
  handleLogin,
} from './src/utils/helpers/msal-helper';
import { useUser } from './src/hooks/use-user';
import { useIsAuthenticated } from './src/hooks/use-is-authenticated';
import userProfile from './src/test/data/userProfile';
import 'whatwg-fetch';
import { mswServer } from './src/api/msw-server';

dotenv.config();

// Necessary for tests to pass when importing Socket.io Client
global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

Object.defineProperty(global.window, 'scrollTo', { value: jest.fn() });

jest.setTimeout(30000);

jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
  a11yLight: undefined,
}));

// jest.mock('@azure/msal-react');

jest.mock('./src/utils/helpers/msal-helper', () => ({
  requestAccessToken: jest.fn(),
  handleLogin: jest.fn(),
  msalInstance: {
    getAllAccounts: jest.fn(),
  },
}));

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('./src/hooks/use-user', () => ({ useUser: jest.fn() }));
jest.mock('./src/hooks/use-is-authenticated', () => ({
  useIsAuthenticated: jest.fn(),
}));
jest.mock('./src/components/MarkdownEditor', () => jest.fn());

jest.mock('remark-gfm', () => jest.fn(() => {}));
jest.mock('rehype-raw', () => jest.fn(() => {}));

const account = { name: 'mockname', username: 'mockusername' };

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

global.beforeEach(() => {
  handleLogin.mockReturnValueOnce();
  requestAccessToken.mockResolvedValue('mockbackendtoken');
  msalInstance.getAllAccounts.mockReturnValue([account]);
  // checkIsAuthenticated.mockReturnValue(true);
  useUser.mockReturnValue(userProfile);
  useIsAuthenticated.mockReturnValue({
    email: account.username,
    isAuthenticated: true,
    account: account,
  });
});

expect.addSnapshotSerializer(createSerializer());

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

export function testIf(predicate) {
  if (predicate) {
    return test;
  } else {
    return test.skip;
  }
}
