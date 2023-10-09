import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../stores/store';
import {GetPostResponse} from '../../../apis/post/getPost';
import {
  GetPostCommentsRequest,
  PostCommentData,
} from '../../../apis/post/getPostComments';
import {State as UserState} from '../../../stores/user/slice';
import {
  collectOrUnCollectPost,
  commentPost,
  getPost,
  getPostComments,
  heatOrUnHeatPost,
  likeOrUnlikeComment,
} from './api';
import {CollectPostRequest} from '../../../apis/post/collectOrUnCollectPost';
import {HeatPostRequest} from '../../../apis/post/heatOrUnHeatPost';
import {listPageReducer} from '../../../stores/helper';
import {LikeCommentRequest} from '../../../apis/comment/likeOrUnlikeComment';
import {
  CommentPostRequest,
  CommentPostResponse,
} from '../../../apis/post/commentPost';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type Scene =
  | 'getPost'
  | 'collectOrUnCollectPost'
  | 'heatOrUnHeatPost'
  | 'getPostComments'
  | 'likeOrUnlikeComment'
  | 'commentPost';

export type CommentCount = number;

export type AuthorAvatar = string;

export type AuthorId = string;

export type AuthorName = string;

export type CreateTime = number;

export type Content = string;

export type CommentId = string;

export type PostId = string;

export type IsCollected = number;

export type IsLiked = number;

export interface State extends GetPostCommentsRequest {
  list: PostCommentData[];
  postDetail: GetPostResponse;
  error: Error;
  scene?: Scene;
  postCommentId?: CommentId;
  postCommentContent?: Content;
  status: Status;
}

const initialState: State = {
  postDetail: {
    authorId: '',
    authorAvatar: '',
    authorGender: '',
    createTime: 0,
    content: '',
    postId: '',
  },
  list: [],
  postId: '',
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
};

export const getPostAsync = createAsyncThunk<
  GetPostResponse,
  string,
  {state: {user: UserState}}
>('commentDetail/getPost', async (postId, {getState}) => {
  const {token} = getState().user;

  return await getPost(postId, token);
});

export const collectOrUnCollectPostAsync = createAsyncThunk<
  void,
  CollectPostRequest,
  {state: {user: UserState}}
>('commentDetail/collectOrUnCollectPost', async (request, {getState}) => {
  const {token} = getState().user;

  return await collectOrUnCollectPost(request, token);
});

export const heatOrUnHeatPostAsync = createAsyncThunk<
  void,
  HeatPostRequest,
  {state: {user: UserState}}
>('commentDetail/heatOrUnHeatPost', async (request, {getState}) => {
  const {token} = getState().user;

  return await heatOrUnHeatPost(request, token);
});

export const getPostCommentsAsync = createAsyncThunk<
  PostCommentData[],
  PostId,
  {state: {commentDetail: State; user: UserState}}
>('commentDetail/getPostComments', async (postId, {getState}) => {
  const {page, pageSize} = getState().commentDetail;
  const {token} = getState().user;

  return await getPostComments({postId, page, pageSize}, token);
});

export const likeOrUnlikeCommentAsync = createAsyncThunk<
  void,
  LikeCommentRequest,
  {state: {user: UserState}}
>('commentDetail/likeOrUnlikeComment', async (request, {getState}) => {
  const {token} = getState().user;

  return await likeOrUnlikeComment(request, token);
});

export const commentPostAsync = createAsyncThunk<
  CommentPostResponse & {content: Content},
  CommentPostRequest,
  {state: {user: UserState}}
>('commentDetail/commentPost', async (request, {getState}) => {
  const {token} = getState().user;

  const response = await commentPost(request, token);

  return {...response, content: request.content};
});

export const slice = createSlice({
  name: 'commentDetail',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    resetPostDetail: state => {
      state.postDetail = initialState.postDetail;
    },

    setPostDetail: (state, action: PayloadAction<any>) => {
      const postDetail = action.payload;

      state.postDetail = {...state.postDetail, ...postDetail};
    },

    prependListItem: (state, action: PayloadAction<PostCommentData>) => {
      state.list = [action.payload, ...state.list];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getPostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        getPostAsync.fulfilled,
        (state, action: PayloadAction<GetPostResponse>) => {
          state.postDetail = action.payload;

          state.status = 'success';
        },
      )

      .addCase(getPostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(collectOrUnCollectPostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(collectOrUnCollectPostAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(collectOrUnCollectPostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(heatOrUnHeatPostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(heatOrUnHeatPostAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(heatOrUnHeatPostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(getPostCommentsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getPostCommentsAsync.fulfilled, listPageReducer)

      .addCase(getPostCommentsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(likeOrUnlikeCommentAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(likeOrUnlikeCommentAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(likeOrUnlikeCommentAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(commentPostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        commentPostAsync.fulfilled,
        (
          state,
          action: PayloadAction<CommentPostResponse & {content: Content}>,
        ) => {
          state.status = 'success';

          state.postCommentId = action.payload.commentId;

          state.postCommentContent = action.payload.content;
        },
      )

      .addCase(commentPostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {
  resetStatus,
  resetPage,
  resetPostDetail,
  setPostDetail,
  setScene,
  prependListItem,
} = slice.actions;

export const status = (state: RootState) => state.commentDetail.status;

export const scene = (state: RootState) => state.commentDetail.scene;

export const postDetail = (state: RootState) => state.commentDetail.postDetail;

export const list = (state: RootState) => state.commentDetail.list;

export const postCommentId = (state: RootState) =>
  state.commentDetail.postCommentId;

export const postCommentContent = (state: RootState) =>
  state.commentDetail.postCommentContent;

export default slice.reducer;