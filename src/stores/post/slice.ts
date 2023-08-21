import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {likeOrUnlikePost} from './api';
import {State as UserState} from '../user/slice';
import {RootState} from '../store';

export type PostId = string;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State {
  operationPostId?: PostId;
  error: Error;
  status: Status;
}

const initialState: State = {
  error: '',
  status: 'idle',
};

export const likeOrUnlikePostAsync = createAsyncThunk<
  void,
  number,
  {state: {post: State; user: UserState}}
>('post/likeOrUnlikePost', async (action, {getState}) => {
  const {token} = getState().user;
  const {operationPostId: postId} = getState().post;

  return await likeOrUnlikePost({postId: postId as PostId, action}, token);
});

export const slice = createSlice({
  name: 'post',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    setOperationPostId: (state, action: PayloadAction<PostId>) => {
      state.operationPostId = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(likeOrUnlikePostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(likeOrUnlikePostAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(likeOrUnlikePostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setOperationPostId} = slice.actions;

export const status = (state: RootState) => state.post.status;

export const operationPostId = (state: RootState) => state.post.operationPostId;

export default slice.reducer;
