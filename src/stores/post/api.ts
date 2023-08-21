import {
  likeOrUnlikePost as likeOrUnlikePostApi,
  LikePostRequest,
} from '../../apis/post/likeOrUnlikePost';

export const likeOrUnlikePost = async (
  request: LikePostRequest,
  token: string,
): Promise<void> => {
  return await likeOrUnlikePostApi(request, token);
};
