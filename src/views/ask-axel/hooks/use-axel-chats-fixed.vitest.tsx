import { renderHook, waitFor } from '@testing-library/react';

import { useAxelChats } from './use-axel-chats';
import { mswServer } from '../../../api/msw-server';
import { ApolloWrapper } from '../../../api/apollo-wrapper';
import { listChatsResponseHandler } from '../../../api/axel/mocks/handlers';
import { CHATS } from '../../../api/axel/mocks/data';
import { setupServer } from 'msw/lib/node';

const wrapper = ApolloWrapper;

const server = setupServer(listChatsResponseHandler);

describe('useAxelChats', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('default to empty chats', async () => {
    const { result } = renderHook(() => useAxelChats(), { wrapper });
    expect(result.current.chats).toEqual([]);
  });

  test('should return chats', async () => {
    const { result } = renderHook(() => useAxelChats(), { wrapper });
    await waitFor(() => expect(result.current.chats).toEqual(CHATS));
  });
});
