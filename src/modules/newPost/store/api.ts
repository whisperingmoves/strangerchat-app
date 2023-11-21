import {
  createPost as createPostApi,
  CreatePostRequest,
  CreatePostResponse,
} from '../../../apis/post/createPost';
import {
  uploadPost as uploadPostApi,
  UploadPostResponse,
} from '../../../apis/resource/uploadPost';
import {
  reverse,
  ReverseRequest,
  ReverseResponse,
} from '../../../nominatim/reverse';

export const createPost = async (
  request: CreatePostRequest,
  token: string,
): Promise<CreatePostResponse> => {
  return await createPostApi(request, token);
};

export const uploadPost = async (
  photo: string,
): Promise<UploadPostResponse> => {
  return await uploadPostApi(photo);
};

export const geoReverse = async (
  request: ReverseRequest,
): Promise<ReverseResponse> => {
  return await reverse(request);
};
