import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {getRecommendedPosts} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  GetRecommendedPostsRequest,
  RecommendedPostData,
} from '../../../apis/post/getRecommendedPosts';
import {getLocation} from '../../../utils/geolocation';

export type LikeCount = number;

export type CommentCount = number;

export type ShareCount = number;

export type IsLiked = number;

export type IsFollowed = number;

export type IsBlocked = number;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type AuthorId = string;

export type PostId = string;

export type UpdateListItemCallbackParam = {
  isFollowed?: IsFollowed;
  isBlocked?: IsBlocked;
  isLiked?: IsLiked;
  likeCount?: LikeCount;
  commentCount?: CommentCount;
  shareCount?: ShareCount;
};

export type UpdateListItemCallback = (
  param: UpdateListItemCallbackParam,
) => void;

export interface State {
  list: RecommendedPostData[];
  page?: number;
  pageSize?: number;
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
};

export const getRecommendedPostsAsync = createAsyncThunk<
  RecommendedPostData[],
  void,
  {state: {recommend: State; user: UserState}}
>('recommend/getRecommendedPosts', async (_, {getState}) => {
  const {page, pageSize} = getState().recommend;
  const {token} = getState().user;

  const geoPosition = await getLocation();
  const request: GetRecommendedPostsRequest = {
    page,
    pageSize,
    longitude: geoPosition?.coords.longitude,
    latitude: geoPosition?.coords.latitude,
  };

  return await getRecommendedPosts(request, token);
});

export const slice = createSlice({
  name: 'recommend',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    updateListItemByAuthorId: (
      state,
      action: PayloadAction<{
        authorId: AuthorId;
        isFollowed?: IsFollowed;
        isBlocked?: IsBlocked;
      }>,
    ) => {
      const listItem = action.payload;

      const updateList = state.list;

      updateList.forEach((item, index) => {
        if (item.authorId !== listItem.authorId) {
          return;
        }

        updateList[index] = {
          ...updateList[index],
          ...listItem,
        };
      });

      state.list = updateList;
    },

    updateListItemByPostId: (
      state,
      action: PayloadAction<{
        postId: PostId;
        isLiked?: IsLiked;
        likeCount?: LikeCount;
        commentCount?: CommentCount;
        shareCount?: ShareCount;
      }>,
    ) => {
      const listItem = action.payload;

      const updateList = state.list;

      updateList.forEach((item, index) => {
        if (item.postId !== listItem.postId) {
          return;
        }

        updateList[index] = {
          ...updateList[index],
          ...listItem,
        };
      });

      state.list = updateList;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getRecommendedPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getRecommendedPostsAsync.fulfilled, listPageReducer)

      .addCase(getRecommendedPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {
  resetStatus,
  resetPage,
  updateListItemByAuthorId,
  updateListItemByPostId,
} = slice.actions;

export const status = (state: RootState) => state.recommend.status;

export const list = (state: RootState) => state.recommend.list;

export default slice.reducer;
