import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {createPost, uploadPost} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {
  CreatePostRequest,
  CreatePostResponse,
} from '../../../apis/post/createPost';
import {copy, copyWithoutEmpty} from '../../../utils/object';
import {UploadPostResponse} from '../../../apis/resource/uploadPost';
import {UPLOAD_UP_TO_MAX_IMAGES} from '../../../constants/home/Config';
import {GeoPosition} from 'react-native-geolocation-service';
import {getLocation} from '../../../utils/geolocation';
import {PRIVATE, PUBLIC} from '../../../constants/newPost/Config';
import {HOME} from '../../../constants/Config';

export type Visibility = number | undefined;

export type Photo = string;

export type Error = string;

export type Scene = 'newPost' | 'uploadPost' | 'getLocation' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export const VISIBILITY_MAP = [PUBLIC, HOME, PRIVATE];

export interface State extends CreatePostRequest, CreatePostResponse {
  error: Error;
  scene: Scene;
  status: Status;
}

const initialState: State = {
  visibility: 0,
  images: [],
  latitude: '',
  longitude: '',
  city: '',
  postId: '',
  content: '',
  error: '',
  scene: undefined,
  status: 'idle',
};

const initialCreatePostRequest: CreatePostRequest = {
  content: '',
  city: undefined,
  longitude: undefined,
  latitude: undefined,
  images: undefined,
  visibility: undefined,
  atUsers: undefined,
};

export const createPostAsync = createAsyncThunk<
  CreatePostResponse,
  void,
  {state: {newPost: State; user: UserState}}
>('newPost/createPost', async (_, {getState}) => {
  const {token} = getState().user;

  const request = initialCreatePostRequest;
  copyWithoutEmpty(request, getState().newPost);

  return await createPost(request, token);
});

export const uploadPostAsync = createAsyncThunk<UploadPostResponse, string>(
  'newPost/uploadPost',
  async photo => {
    return await uploadPost(photo);
  },
);

export const getLocationAsync = createAsyncThunk<GeoPosition | undefined, void>(
  'newPost/getLocation',
  async () => {
    return await getLocation();
  },
);

export const slice = createSlice({
  name: 'newPost',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    resetState: state => {
      copy(state, initialState);
    },

    setState: (state, action: PayloadAction<any>) => {
      copy(state, action.payload);
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    setVisibility: (state, action: PayloadAction<Visibility>) => {
      state.visibility = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createPostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        createPostAsync.fulfilled,
        (state, action: PayloadAction<CreatePostResponse>) => {
          copy(state, action.payload);

          state.status = 'success';
        },
      )

      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(uploadPostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        uploadPostAsync.fulfilled,
        (state, action: PayloadAction<UploadPostResponse>) => {
          if (state.images && state.images.length >= 9) {
            state.status = 'failed';

            state.error = UPLOAD_UP_TO_MAX_IMAGES;
          } else {
            state.images?.push(action.payload.url);

            state.status = 'success';
          }
        },
      )

      .addCase(uploadPostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(getLocationAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getLocationAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.longitude = action.payload?.coords.longitude.toString();

        state.latitude = action.payload?.coords.latitude.toString();
      })

      .addCase(getLocationAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setState, resetState, setScene, setVisibility} =
  slice.actions;

export const status = (state: RootState) => state.newPost.status;

export const scene = (state: RootState) => state.newPost.scene;

export const content = (state: RootState) => state.newPost.content;

export const images = (state: RootState) => state.newPost.images;

export const visibility = (state: RootState) => state.newPost.visibility;

export default slice.reducer;
