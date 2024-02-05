import { gql } from '@apollo/client';

export type AxelChat = { name: string; chatId: string; lastUpdate: string };

export type ListChatsResponse = {
  // lastUpdate is actually nullable
  listChats: AxelChat[];
};
export const LIST_CHATS = gql`
  query ListChats {
    listChats {
      name
      chatId
      lastUpdate
    }
  }
`;

export const OPEN_CHAT = gql`
  query OpenChat($chatId: String!) {
    openChat(chatId: $chatId) {
      history {
        request
        answer
        sourceDocs {
          title
          url
        }
        probablePublicData
      }
      chatId
    }
  }
`;

export const CHAT_REQUEST = gql`
  query ChatRequest($chatMessage: ChatMessage!) {
    chatRequest(chatMessage: $chatMessage) {
      request
      answer
      chatId
      chatName
      sourceDocs {
        title
        url
      }
      probablePublicData
    }
  }
`;

export const QA_REQUEST = gql`
  query QARequest($qaMessage: QaMessage!) {
    qaRequest(qaMessage: $qaMessage) {
      request
      answer
      sourceDocs {
        title
        url
      }
      probablePublicData
    }
  }
`;

export const RENAME_CHAT = gql`
  mutation RenameChat($renameMessage: RenameMessage!) {
    renameChat(renameMessage: $renameMessage) {
      name
      chatId
      lastUpdate
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($chatId: String!) {
    deleteChat(chatId: $chatId) {
      name
      chatId
    }
  }
`;

export const NEW_CHAT = gql`
  mutation NewChat {
    newChat {
      chatId
    }
  }
`;

export type ChatRequestResponse = {
  request: string;
  answer: string;
  chatName?: string;
  chatId: string;
  sourceDocs: SourceDoc[];
  probablePublicData: boolean;
};

export type QaRequestResponse = {
  request: string;
  answer: string;
  sourceDocs: SourceDoc[];
  probablePublicData: boolean;
};

export type SourceDoc = {
  title: string;
  url: string;
};
export type RenameMessage = {
  chatId: string;
  newName: string;
};
export type ChatMessage = {
  chatId: string;
  request: string;
};
