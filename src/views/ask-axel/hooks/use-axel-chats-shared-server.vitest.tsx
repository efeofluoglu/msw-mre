import { renderHook, waitFor } from '@testing-library/react';

import { useAxelChats } from './use-axel-chats';
import { mswServer } from '../../../api/msw-server';
import { ApolloWrapper } from '../../../api/apollo-wrapper';
import { listChatsResponseHandler } from '../../../api/axel/mocks/handlers';
import { CHATS } from '../../../api/axel/mocks/data';

const wrapper = ApolloWrapper;

describe('useAxelChats', () => {
  beforeEach(() => {
    mswServer.use(listChatsResponseHandler);
  });

  test('default to empty chats', async () => {
    const { result } = renderHook(() => useAxelChats(), { wrapper });
    expect(result.current.chats).toEqual([]);
  });

  // TODO: fix this later
  test('should return chats', async () => {
    const { result } = renderHook(() => useAxelChats(), { wrapper });
    await waitFor(() => expect(result.current.chats).toEqual(CHATS));
  });
});
