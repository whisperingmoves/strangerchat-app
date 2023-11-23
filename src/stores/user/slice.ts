import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../apis/user/registerUser';
import {copy} from '../../utils/object';
import {RootState} from '../store';
import {
  blockOrUnblockUser,
  followOrUnfollowUser,
  getMyPosts,
  registerUser,
  reportUser,
  updateUserProfile,
  uploadAvatar,
} from './api';
import {VerifyCodeResponse} from '../../apis/verification/verifyCode';
import {Mobile} from '../../modules/login/store/slice';
import {UploadAvatarResponse} from '../../apis/resource/uploadAvatar';
import {UpdateUserProfileRequest} from '../../apis/user/updateUserProfile';
import {GetMyPostsRequest, MyPostData} from '../../apis/user/getMyPosts';
import {listPageReducer} from '../helper';

export type UserId = string;

export type Error = string;

export type Scene =
  | 'avatar'
  | 'postItem'
  | 'followUserOnChatDetail'
  | 'unfollowUserOnChatDetail'
  | 'blockUserOnChatDetail'
  | 'unblockUserOnChatDetail'
  | 'reportUserOnChatDetail'
  | 'followUserOnCommentDetail'
  | 'unfollowUserOnCommentDetail'
  | 'blockUserOnCommentDetail'
  | 'unblockUserOnCommentDetail'
  | 'reportUserOnCommentDetail'
  | 'updateAvatar'
  | 'updateUsername'
  | 'updateLanguage'
  | 'getMyPosts'
  | 'followUserOnMyFollowing'
  | 'unfollowUserOnMyFollowing'
  | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Avatar = string;

export type FollowingCount = number;

export type FollowersCount = number;

export type VisitorsCount = number;

export type Action = number;

export type CoinBalance = number;

export type Language = string;

export interface State
  extends RegisterUserResponse,
    VerifyCodeResponse,
    UploadAvatarResponse,
    GetMyPostsRequest {
  mobile: Mobile;
  operationUserId?: UserId;
  error: Error;
  scene: Scene;
  status: Status;
  list: MyPostData[];
  language: Language;
}

const initialState: State = {
  token: '',
  userId: '',
  gender: '',
  birthday: '',
  avatar: '',
  giftsReceived: 0,
  username: '',
  city: '',
  followingCount: 0,
  followersCount: 0,
  visitorsCount: 0,
  freeHeatsLeft: 0,
  coinBalance: 0,
  checkedDays: 0,
  lastCheckDate: 0,
  mobile: '',
  scene: undefined,
  error: '',
  status: 'idle',
  url: '',
  list: [],
  page: 1,
  pageSize: 10,
  language: '',
};

export const registerUserAsync = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserRequest
>('user/registerUser', async request => {
  return await registerUser(request);
});

export const followOrUnfollowUserAsync = createAsyncThunk<
  Action,
  number,
  {state: {user: State}}
>('user/followOrUnfollowUser', async (action, {getState}) => {
  const {token, operationUserId: userId} = getState().user;

  await followOrUnfollowUser({userId: userId as UserId, action}, token);

  return action;
});

export const blockOrUnblockUserAsync = createAsyncThunk<
  void,
  number,
  {state: {user: State}}
>('user/blockOrUnblockUser', async (action, {getState}) => {
  const {token, operationUserId: userId} = getState().user;

  return await blockOrUnblockUser({userId: userId as UserId, action}, token);
});

export const reportUserAsync = createAsyncThunk<
  void,
  string,
  {state: {user: State}}
>('user/reportUser', async (userId, {getState}) => {
  const {token} = getState().user;

  return await reportUser({userId}, token);
});

export const uploadAvatarAsync = createAsyncThunk<UploadAvatarResponse, string>(
  'user/uploadAvatar',
  async avatar => {
    return await uploadAvatar(avatar);
  },
);

export const updateUserProfileAsync = createAsyncThunk<
  void,
  UpdateUserProfileRequest,
  {state: {user: State}}
>('user/updateUserProfile', async (request, {getState}) => {
  const {token} = getState().user;

  return await updateUserProfile(request, token);
});

export const getMyPostsAsync = createAsyncThunk<
  MyPostData[],
  void,
  {state: {user: State}}
>('user/getUserPosts', async (_, {getState}) => {
  const {token, page, pageSize} = getState().user;

  return await getMyPosts({page, pageSize}, token);
});

export const slice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    setUser: (state, action: PayloadAction<any>) => {
      copy(state, action.payload);
    },

    setOperationUserId: (state, action: PayloadAction<UserId>) => {
      state.operationUserId = action.payload;
    },

    prependListItem: (state, action: PayloadAction<MyPostData>) => {
      state.list = [action.payload, ...state.list];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUserAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'success';

        copy(state, action.payload);
      })

      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(followOrUnfollowUserAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        followOrUnfollowUserAsync.fulfilled,
        (state, action: PayloadAction<Action>) => {
          state.status = 'success';

          let followingCount = state.followingCount as FollowingCount;

          if (action.payload === 1) {
            followingCount += 1;
          } else {
            followingCount -= 1;

            if (followingCount < 0) {
              followingCount = 0;
            }
          }

          state.followingCount = followingCount;
        },
      )

      .addCase(followOrUnfollowUserAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(blockOrUnblockUserAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(blockOrUnblockUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
      })

      .addCase(blockOrUnblockUserAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(reportUserAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(reportUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
      })

      .addCase(reportUserAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(uploadAvatarAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(uploadAvatarAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.url = action.payload.url;
      })

      .addCase(uploadAvatarAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(updateUserProfileAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(updateUserProfileAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(getMyPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getMyPostsAsync.fulfilled, listPageReducer)

      .addCase(getMyPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {
  resetStatus,
  setScene,
  setUser,
  setOperationUserId,
  prependListItem,
  resetPage,
} = slice.actions;

export const status = (state: RootState) => state.user.status;

export const scene = (state: RootState) => state.user.scene;

export const userId = (state: RootState) => state.user.userId;

export const username = (state: RootState) => state.user.username;

export const token = (state: RootState) => state.user.token;

export const checkedDays = (state: RootState) => state.user.checkedDays;

export const lastCheckDate = (state: RootState) => state.user.lastCheckDate;

export const operationUserId = (state: RootState) => state.user.operationUserId;

export const coinBalance = (state: RootState) => state.user.coinBalance;

export const avatar = (state: RootState) => state.user.avatar;

export const freeHeatsLeft = (state: RootState) => state.user.freeHeatsLeft;

export const giftsReceived = (state: RootState) => state.user.giftsReceived;

export const followingCount = (state: RootState) => state.user.followingCount;

export const followersCount = (state: RootState) => state.user.followersCount;

export const visitorsCount = (state: RootState) => state.user.visitorsCount;

export const list = (state: RootState) => state.user.list;

export const city = (state: RootState) => state.user.city;

export default slice.reducer;
