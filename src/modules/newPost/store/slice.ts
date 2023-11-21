import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {createPost, geoReverse, uploadPost} from './api';
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
import {Lat, Lon, ReverseResponse} from '../../../nominatim/reverse';

export type Visibility = number;

export type Photo = string;

export type Error = string;

export type Scene =
  | 'newPost'
  | 'uploadPost'
  | 'getLocation'
  | 'geoReverse'
  | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type UserId = string;

export type Username = string;

export type Avatar = string;

export type Keyword = string;

export const VISIBILITY_MAP = [PUBLIC, HOME, PRIVATE];

export interface AtUser {
  userId: UserId;
  username?: Username;
}

export interface State extends CreatePostRequest, CreatePostResponse {
  error: Error;
  scene: Scene;
  status: Status;
  checkedAtUsers: AtUser[];
  confirmedAtUsers: AtUser[];
  keyword?: Keyword;
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
  atUsers: [],
  checkedAtUsers: [],
  confirmedAtUsers: [],
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

export const geoReverseAsync = createAsyncThunk<
  ReverseResponse | undefined,
  void,
  {state: {newPost: State}}
>('newPost/geoReverse', async (_, {getState}) => {
  const {latitude, longitude} = getState().newPost;

  if (!latitude || !longitude) {
    return;
  }

  const request = {
    lat: latitude as Lat,
    lon: longitude as Lon,
  };

  return await geoReverse(request);
});

export const slice = createSlice({
  name: 'newPost',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetState: state => {
      copy(state, initialState);
    },

    setState: (state, action: PayloadAction<any>) => {
      copy(state, action.payload);
    },

    setAtUsers: (state, action: PayloadAction<UserId[]>) => {
      state.atUsers = action.payload;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    setKeyword: (state, action: PayloadAction<Keyword>) => {
      state.keyword = action.payload;
    },

    setVisibility: (state, action: PayloadAction<Visibility>) => {
      state.visibility = action.payload;
    },

    removeImageByIndex: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      if (state.images && index >= 0 && index < state.images.length) {
        state.images = state.images.filter((_, i) => i !== index);
      }
    },

    updateCheckedAtUsers: (state, action: PayloadAction<AtUser>) => {
      const {userId, username} = action.payload;
      const existingUserIndex = state.checkedAtUsers.findIndex(
        user => user.userId === userId,
      );

      const updateCheckedAtUsers = state.checkedAtUsers;

      if (existingUserIndex !== -1) {
        updateCheckedAtUsers[existingUserIndex].username = username;
      } else {
        updateCheckedAtUsers.push({userId, username});
      }

      state.checkedAtUsers = updateCheckedAtUsers;
    },

    removeCheckedAtUser: (state, action: PayloadAction<UserId>) => {
      const userIdToRemove = action.payload;

      state.checkedAtUsers = state.checkedAtUsers.filter(
        user => user.userId !== userIdToRemove,
      );
    },

    removeAtUser: (state, action: PayloadAction<UserId>) => {
      const userIdToRemove = action.payload;

      state.atUsers = state.atUsers?.filter(
        userId => userId !== userIdToRemove,
      );
    },

    removeConfirmedAtUser: (state, action: PayloadAction<UserId>) => {
      const userIdToRemove = action.payload;

      state.confirmedAtUsers = state.confirmedAtUsers?.filter(
        user => user.userId !== userIdToRemove,
      );
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
      })

      .addCase(geoReverseAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(geoReverseAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.city = action.payload?.features[0].properties.geocoding.city;
      })

      .addCase(geoReverseAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {
  resetStatus,
  setState,
  resetState,
  setScene,
  setVisibility,
  removeImageByIndex,
  setKeyword,
  updateCheckedAtUsers,
  removeCheckedAtUser,
  setAtUsers,
  removeAtUser,
  removeConfirmedAtUser,
} = slice.actions;

export const status = (state: RootState) => state.newPost.status;

export const scene = (state: RootState) => state.newPost.scene;

export const content = (state: RootState) => state.newPost.content;

export const images = (state: RootState) => state.newPost.images;

export const visibility = (state: RootState) => state.newPost.visibility;

export const checkedAtUsers = (state: RootState) =>
  state.newPost.checkedAtUsers;

export const confirmedAtUsers = (state: RootState) =>
  state.newPost.confirmedAtUsers;

export const keyword = (state: RootState) => state.newPost.keyword;

export const city = (state: RootState) => state.newPost.city;

export default slice.reducer;
