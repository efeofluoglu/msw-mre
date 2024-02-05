import { HttpResponse, graphql } from 'msw';
import { LIST_CHATS, QA_REQUEST } from '../gql';
import { CHATS, mockQAResponse } from './data';

export const listChatsResponseHandler = graphql.query(LIST_CHATS, () =>
  HttpResponse.json({
    data: {
      listChats: CHATS,
    },
  })
);

export const qaRequestResponseHandler = graphql.query(QA_REQUEST, () =>
  HttpResponse.json(mockQAResponse)
);
