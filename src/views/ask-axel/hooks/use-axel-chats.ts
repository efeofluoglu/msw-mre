import { useQuery } from '@apollo/client';
import { AxelChat, LIST_CHATS, ListChatsResponse } from '../../../api/axel/gql';

export type AxelChatUpdate = Required<Pick<AxelChat, 'chatId'>> &
  Partial<AxelChat>;

export function useAxelChats(): {
  chats: AxelChat[];
  chatsAreLoading: boolean;
  refetchChats: () => void;
} {
  const {
    loading: chatsAreLoading,
    refetch: refetchChats,
    data: chatListData,
  } = useQuery<ListChatsResponse>(LIST_CHATS, {
    fetchPolicy: 'no-cache',
  });

  return {
    chats: chatListData?.listChats ?? [],
    chatsAreLoading,
    refetchChats,
  };
}
