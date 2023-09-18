import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RecentMessage} from '../../../apis/notification/recentMessages';
import {SentMessage} from '../../../apis/notification/sentMessage';
import {RootState} from '../../../stores/store';
import {MarkedAsReadMessage} from '../../../apis/notification/markedAsReadMessage';
import {
  getRecentChatMessages,
  markMessageAsRead,
  sendMessage,
  uploadMessage,
} from './api';
import {GetRecentChatMessages} from '../../../apis/message/getRecentChatMessages';
import {SendMessage} from '../../../apis/message/sendMessage';
import {MarkMessageAsRead} from '../../../apis/message/markMessageAsRead';
import {Id} from '../../gift/store/slice';
import {socket} from '../../../apis/socket';

export interface Message extends RecentMessage, SentMessage {}

export type Uri = string;

export type Error = string;

export type Scene =
  | 'getRecentChatMessages'
  | 'sendMessage'
  | 'markMessageAsRead'
  | 'uploadMessage'
  | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type ConversationId = string;

export type MessageId = string;

export type SenderId = string;

export type SentTime = number;

export type Content = string;

export type ContentLength = number;

export type Type = number;

export type ReadStatus = number;

export type SendStatus = number;

export type HandleSend = (
  value: Content,
  type?: Type,
  giftId?: Id,
  contentLength?: ContentLength,
) => void;

export interface State {
  messageMap: Record<ConversationId, Message[]>;
  messageUri?: Uri;
  error: Error;
  scene?: Scene;
  currentConversationId?: ConversationId;
  currentVoiceMessageId?: MessageId;
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

export const uploadMessageAsync = createAsyncThunk<Uri, Uri>(
  'chatDetail/uploadMessage',
  uri => {
    return new Promise((resolve, reject) => {
      if (!socket.connected) {
        socket.connect();

        socket.on('connect', () => {
          uploadMessage(uri)
            .then(uploadMessageResponse => resolve(uploadMessageResponse.url))
            .catch(error => reject(error));
        });

        socket.on('connect_error', err => {
          reject(err);
        });
      } else {
        uploadMessage(uri)
          .then(uploadMessageResponse => resolve(uploadMessageResponse.url))
          .catch(error => reject(error));
      }
    });
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

    deleteMessage: (
      state: State,
      action: PayloadAction<{
        clientMessageId?: MessageId;
        messageId: MessageId;
        conversationId: MessageId;
      }>,
    ) => {
      const {clientMessageId, messageId, conversationId} = action.payload;
      const updatedMessageMap = {...state.messageMap};

      const conversationMessages = updatedMessageMap[conversationId];

      if (conversationMessages) {
        updatedMessageMap[conversationId] = conversationMessages.filter(
          message =>
            message.clientMessageId
              ? message.clientMessageId !== clientMessageId
              : message.messageId !== messageId,
        );

        if (!updatedMessageMap[conversationId].length) {
          delete updatedMessageMap[conversationId];
        }
      }

      state.messageMap = updatedMessageMap;
    },

    updateMessageConversationId: (
      state: State,
      action: PayloadAction<{
        clientConversationId: ConversationId;
        conversationId: ConversationId;
      }>,
    ) => {
      const {clientConversationId, conversationId} = action.payload;
      const updatedMessageMap = {...state.messageMap};

      const conversationMessages = updatedMessageMap[clientConversationId];

      if (conversationMessages) {
        updatedMessageMap[conversationId] = conversationMessages.map(
          message => ({
            ...message,
            conversationId: conversationId,
          }),
        );

        delete updatedMessageMap[clientConversationId];
      }

      state.messageMap = updatedMessageMap;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    resetStatus: state => {
      state.status = initialState.status;
    },

    resetMessageUri: state => {
      state.messageUri = initialState.messageUri;
    },

    setCurrentVoiceMessageId: (state, action: PayloadAction<MessageId>) => {
      state.currentVoiceMessageId = action.payload;
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
      })

      .addCase(uploadMessageAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        uploadMessageAsync.fulfilled,
        (state, action: PayloadAction<Uri>) => {
          state.messageUri = action.payload;

          state.status = 'success';
        },
      )

      .addCase(uploadMessageAsync.rejected, (state, action) => {
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
  deleteMessage,
  updateMessageConversationId,
  setScene,
  resetStatus,
  resetMessageUri,
  setCurrentVoiceMessageId,
} = slice.actions;

export const status = (state: RootState) => state.chatDetail.status;

export const scene = (state: RootState) => state.chatDetail.scene;

export const messageMap = (state: RootState) => state.chatDetail.messageMap;

export const messageUri = (state: RootState) => state.chatDetail.messageUri;

export const currentVoiceMessageId = (state: RootState) =>
  state.chatDetail.currentVoiceMessageId;

export default slice.reducer;
