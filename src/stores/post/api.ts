import {
  likeOrUnlikePost as likeOrUnlikePostApi,
  LikePostRequest,
} from '../../apis/post/likeOrUnlikePost';
import {
  sharePost as sharePostApi,
  SharePostRequest,
} from '../../apis/post/sharePost';

export const likeOrUnlikePost = async (
  request: LikePostRequest,
  token: string,
): Promise<void> => {
  return await likeOrUnlikePostApi(request, token);
};

export const sharePost = async (
  request: SharePostRequest,
  token: string,
): Promise<void> => {
  return await sharePostApi(request, token);
};
