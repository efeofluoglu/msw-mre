const CHAT_ID = 'chat-id';
const CHAT_NAME = 'chat-name';

const ONE_DAY_IN_MILLISECS = 24 * 60 * 60 * 1000;
const now = new Date(2023, 11, 17, 0);
const yesterday = new Date(now.getTime() - ONE_DAY_IN_MILLISECS);
const aWeekAgo = new Date(now.getTime() - 7 * ONE_DAY_IN_MILLISECS);

export const CHATS = [
  {
    chatId: CHAT_ID,
    name: CHAT_NAME,
    lastUpdate: now.toISOString(),
  },
  {
    chatId: CHAT_ID + '-1',
    name: CHAT_NAME + '-1',
    lastUpdate: yesterday.toISOString(),
  },
  {
    chatId: CHAT_ID + '-2',
    name: CHAT_NAME + '-2',
    lastUpdate: aWeekAgo.toISOString(),
  },
];

export const mockQAResponse = {
  data: {
    qaRequest: {
      request: 'dummy search',
      answer: 'this is a dummy answer',
      sourceDocs: [
        {
          title: 'Source 1',
          url: 'https://www.example.com/source1',
        },
        {
          title: 'Source 2',
          url: 'https://www.example.com/source2',
        },
      ],
      probablePublicData: false,
    },
  },
};
