import { renderHook, waitFor } from '@testing-library/react';

import { useAxelChats } from './use-axel-chats';
import { ApolloWrapper } from '../../../api/apollo-wrapper';
import { listChatsResponseHandler } from '../../../api/axel/mocks/handlers';
import { CHATS } from '../../../api/axel/mocks/data';
import { setupServer } from 'msw/node';

const wrapper = ApolloWrapper;

const server = setupServer(listChatsResponseHandler);
server.events.on('request:start', async ({ request }) => {
  // const payload = await request.clone().json();
  console.log('Start process for handler with operationName', request);
});

describe('useAxelChats', () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest: async (request) => {
        const payload = await request.clone().json();
        console.log('No handler for operationName', payload.operationName);
      },
    })
  );
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
