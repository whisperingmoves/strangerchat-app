import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RecentMessage} from '../../../apis/notification/recentMessages';
import {SentMessage} from '../../../apis/notification/sentMessage';
import {RootState} from '../../../stores/store';
import {MarkedAsReadMessage} from '../../../apis/notification/markedAsReadMessage';
import {getRecentChatMessages, markMessageAsRead, sendMessage} from './api';
import {GetRecentChatMessages} from '../../../apis/message/getRecentChatMessages';
import {SendMessage} from '../../../apis/message/sendMessage';
import {MarkMessageAsRead} from '../../../apis/message/markMessageAsRead';

export interface Message extends RecentMessage, SentMessage {}

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type ConversationId = string;

export type MessageId = string;

export type SenderId = string;

export type SentTime = number;

export type Content = string;

export type Type = number;

export type ReadStatus = number;

export interface State {
  messageMap: Record<ConversationId, Message[]>;
  error: Error;
  currentConversationId?: ConversationId;
  status: Status;
}

const initialState: State = {
  messageMap: {},
  error: '',
  status: 'idle',
};

export const getRecentChatMessagesAsync = createAsyncThunk<
  void,
  GetRecentChatMessages
>('chatDetail/getRecentChatMessages', async param => {
  await getRecentChatMessages(param);
});

export const sendMessageAsync = createAsyncThunk<void, SendMessage>(
  'chatDetail/sendMessage',
  async param => {
    await sendMessage(param);
  },
);

export const markMessageAsReadAsync = createAsyncThunk<void, MarkMessageAsRead>(
  'chatDetail/markMessageAsRead',
  async param => {
    await markMessageAsRead(param);
  },
);

export const slice = createSlice({
  name: 'chatDetail',

  initialState,

  reducers: {
    setCurrentConversationId: (
      state,
      action: PayloadAction<ConversationId>,
    ) => {
      state.currentConversationId = action.payload;
    },

    resetCurrentConversationId: state => {
      state.currentConversationId = initialState?.currentConversationId;
    },

    setRecentMessages: (
      state: State,
      action: PayloadAction<RecentMessage[]>,
    ) => {
      const recentMessages = action.payload;

      if (recentMessages && recentMessages.length > 0) {
        const updatedMessageMap = {...state.messageMap};

        recentMessages.forEach(recentMessage => {
          const {conversationId, messageId} = recentMessage;
          const existingMessages = updatedMessageMap[conversationId];

          if (existingMessages) {
            const updatedMessages = existingMessages.map(message => {
              if (message.messageId === messageId) {
                return {
                  ...message,
                  ...recentMessage,
                };
              }
              return message;
            });

            if (
              !existingMessages.some(message => message.messageId === messageId)
            ) {
              updatedMessages.push(recentMessage);
            }

            updatedMessages.sort((a, b) => b.sentTime - a.sentTime);

            updatedMessageMap[conversationId] = updatedMessages;
          } else {
            updatedMessageMap[conversationId] = [recentMessage];
          }
        });

        state.messageMap = updatedMessageMap;
      }
    },

    setSentMessage: (state: State, action: PayloadAction<SentMessage>) => {
      const updatedMessageMap = {...state.messageMap};

      const sentMessage = action.payload;
      const {conversationId, messageId, clientMessageId} = sentMessage;

      const existingMessages = updatedMessageMap[conversationId];

      if (existingMessages) {
        const updatedMessages = existingMessages.map(message => {
          if (
            clientMessageId
              ? message.clientMessageId === clientMessageId
              : message.messageId === messageId
          ) {
            return {
              ...message,
              ...sentMessage,
            };
          }

          return message;
        });

        if (
          !existingMessages.some(message =>
            clientMessageId
              ? message.clientMessageId === clientMessageId
              : message.messageId === messageId,
          )
        ) {
          updatedMessages.push(sentMessage);
        }

        updatedMessages.sort((a, b) => b.sentTime - a.sentTime);

        updatedMessageMap[conversationId] = updatedMessages;
      } else {
        updatedMessageMap[conversationId] = [sentMessage];
      }

      state.messageMap = updatedMessageMap;
    },

    markedAsReadMessage: (
      state: State,
      action: PayloadAction<MarkedAsReadMessage>,
    ) => {
      const {conversationId, messageId, readStatus} = action.payload;
      const updatedMessageMap = {...state.messageMap};

      const existingMessages = updatedMessageMap[conversationId];

      if (existingMessages) {
        updatedMessageMap[conversationId] = existingMessages.map(message => {
          if (message.messageId === messageId) {
            return {
              ...message,
              readStatus: readStatus !== undefined ? readStatus : 0,
            };
          }
          return message;
        });

        state.messageMap = updatedMessageMap;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getRecentChatMessagesAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getRecentChatMessagesAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(getRecentChatMessagesAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(sendMessageAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(sendMessageAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(sendMessageAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(markMessageAsReadAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(markMessageAsReadAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(markMessageAsReadAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {
  setRecentMessages,
  setSentMessage,
  markedAsReadMessage,
  setCurrentConversationId,
  resetCurrentConversationId,
} = slice.actions;

export const status = (state: RootState) => state.chatDetail.status;

export const messageMap = (state: RootState) => state.chatDetail.messageMap;

export default slice.reducer;
