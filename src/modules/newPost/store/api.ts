import {
  createPost as createPostApi,
  CreatePostRequest,
  CreatePostResponse,
} from '../../../apis/post/createPost';
import {
  uploadPost as uploadPostApi,
  UploadPostResponse,
} from '../../../apis/resource/uploadPost';

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
