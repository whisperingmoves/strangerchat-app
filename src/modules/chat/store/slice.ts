import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {sortBy} from 'lodash';
import {CreatedConversation} from '../../../apis/notification/createdConversation';
import {RecentConversation} from '../../../apis/notification/recentConversations';
import {ConversationDetails} from '../../../apis/notification/conversationDetails';
import {UnreadNotificationsCount} from '../../../apis/notification/unreadNotificationsCount';
import {RootState} from '../../../stores/store';
import {
  createChatConversation,
  getChatConversationDetails,
  getRecentChatConversations,
} from './api';
import {CreateChatConversation} from '../../../apis/message/createChatConversation';
import {Socket} from 'socket.io-client';
import {GetRecentChatConversations} from '../../../apis/message/getRecentChatConversations';
import {GetChatConversationDetails} from '../../../apis/message/getChatConversationDetails';

export type Count = number;

export interface Conversation
  extends CreatedConversation,
    RecentConversation,
    ConversationDetails {}

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type OpponentAvatar = string;

export type OpponentOnlineStatus = number;

export type OpponentUsername = string;

export type OpponentUserId = string;

export type LastMessageTime = number;

export type LastMessageContent = string;

export type Keyword = string;

export type ConversationId = string;

export type UnreadCount = number;

export interface State {
  unreadNotificationsCount: Count;
  conversationList: Conversation[];
  keyword: Keyword;
  error: Error;
  status: Status;
}

const initialState: State = {
  unreadNotificationsCount: 0,
  conversationList: [],
  keyword: '',
  error: '',
  status: 'idle',
};

export const createChatConversationAsync = createAsyncThunk<
  void,
  {data: CreateChatConversation; socket: Socket | undefined}
>('chat/createChatConversation', async param => {
  await createChatConversation(param.data, param.socket);
});

export const getRecentChatConversationsAsync = createAsyncThunk<
  void,
  {data: GetRecentChatConversations; socket: Socket | undefined}
>('chat/getRecentChatConversations', async param => {
  await getRecentChatConversations(param.data, param.socket);
});

export const getChatConversationDetailsAsync = createAsyncThunk<
  void,
  {data: GetChatConversationDetails; socket: Socket | undefined}
>('chat/getChatConversationDetails', async param => {
  await getChatConversationDetails(param.data, param.socket);
});

export const slice = createSlice({
  name: 'chat',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    setKeyword: (state, action: PayloadAction<Keyword>) => {
      state.keyword = action.payload;
    },

    setUnreadNotificationsCount: (
      state,
      action: PayloadAction<UnreadNotificationsCount>,
    ) => {
      if (action.payload.count) {
        state.unreadNotificationsCount = action.payload.count;
      }
    },

    setCreatedConversation: (
      state,
      action: PayloadAction<CreatedConversation>,
    ) => {
      const conversation: Conversation = {
        ...action.payload,
        lastMessageContent: '',
        lastMessageTime: 0,
      };

      let conversationList = state.conversationList;

      const existingConversationIndex = conversationList.findIndex(item =>
        conversation.clientConversationId
          ? item.clientConversationId === conversation.clientConversationId
          : item.conversationId === conversation.conversationId,
      );

      if (existingConversationIndex !== -1) {
        conversationList[existingConversationIndex] = {
          ...conversationList[existingConversationIndex],
          ...conversation,
        };
      } else {
        conversationList.push(conversation);
      }

      conversationList = sortBy(conversationList, [
        'lastMessageTime',
      ]).reverse();

      state.conversationList = conversationList;
    },

    setRecentConversations: (
      state: State,
      action: PayloadAction<RecentConversation[]>,
    ) => {
      const recentConversations = action.payload;

      if (recentConversations && recentConversations.length > 0) {
        let updatedConversationList = [...state.conversationList];

        recentConversations.forEach(recentConversation => {
          const existingConversationIndex = updatedConversationList.findIndex(
            conversation =>
              conversation.conversationId === recentConversation.conversationId,
          );

          if (existingConversationIndex !== -1) {
            updatedConversationList[existingConversationIndex] = {
              ...updatedConversationList[existingConversationIndex],
              ...recentConversation,
            };
          } else {
            updatedConversationList.push(recentConversation);
          }
        });

        updatedConversationList = sortBy(updatedConversationList, [
          'lastMessageTime',
        ]).reverse();

        state.conversationList = updatedConversationList;
      }
    },

    setConversationDetails: (
      state: State,
      action: PayloadAction<ConversationDetails>,
    ) => {
      const conversationDetails = action.payload;

      let updatedConversationList = [...state.conversationList];

      const existingConversationIndex = state.conversationList.findIndex(
        conversation =>
          conversation.conversationId === conversationDetails.conversationId,
      );

      if (existingConversationIndex !== -1) {
        state.conversationList[existingConversationIndex] = {
          ...state.conversationList[existingConversationIndex],
          ...conversationDetails,
        };
      } else {
        updatedConversationList.push(conversationDetails);
      }

      updatedConversationList = sortBy(updatedConversationList, [
        'lastMessageTime',
      ]).reverse();

      state.conversationList = updatedConversationList;
    },

    setConversation: (
      state: State,
      action: PayloadAction<{
        clientConversationId?: ConversationId;
        conversationId?: ConversationId;
        lastMessageTime: LastMessageTime;
        lastMessageContent: LastMessageContent;
      }>,
    ) => {
      const conversation = action.payload;

      let conversationList = state.conversationList;

      const existingConversationIndex = conversationList.findIndex(item =>
        conversation.clientConversationId
          ? item.clientConversationId === conversation.clientConversationId
          : item.conversationId === conversation.conversationId,
      );

      if (existingConversationIndex !== -1) {
        conversationList[existingConversationIndex] = {
          ...conversationList[existingConversationIndex],
          ...conversation,
        };

        conversationList = sortBy(conversationList, [
          'lastMessageTime',
        ]).reverse();

        state.conversationList = conversationList;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createChatConversationAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(createChatConversationAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(createChatConversationAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(getRecentChatConversationsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getRecentChatConversationsAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(getRecentChatConversationsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(getChatConversationDetailsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getChatConversationDetailsAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(getChatConversationDetailsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {
  resetStatus,
  setKeyword,
  setUnreadNotificationsCount,
  setCreatedConversation,
  setRecentConversations,
  setConversationDetails,
  setConversation,
} = slice.actions;

export const error = (state: RootState) => state.chat.error;

export const status = (state: RootState) => state.chat.status;

export const keyword = (state: RootState) => state.chat.keyword;

export const conversationList = (state: RootState) =>
  state.chat.conversationList;

export const unreadNotificationsCount = (state: RootState) =>
  state.chat.unreadNotificationsCount;

export default slice.reducer;
