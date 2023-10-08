import {
  getPost as getPostApi,
  GetPostResponse,
} from '../../../apis/post/getPost';
import {
  collectOrUnCollectPost as collectOrUnCollectPostApi,
  CollectPostRequest,
} from '../../../apis/post/collectOrUnCollectPost';
import {
  heatOrUnHeatPost as heatOrUnHeatPostApi,
  HeatPostRequest,
} from '../../../apis/post/heatOrUnHeatPost';
import {
  getPostComments as getPostCommentsApi,
  GetPostCommentsRequest,
  PostCommentData,
} from '../../../apis/post/getPostComments';
import {
  LikeCommentRequest,
  likeOrUnlikeComment as likeOrUnlikeCommentApi,
} from '../../../apis/comment/likeOrUnlikeComment';
import {
  commentPost as comentPostApi,
  CommentPostRequest,
  CommentPostResponse,
} from '../../../apis/post/commentPost';

export const getPost = async (
  postId: string,
  token: string,
): Promise<GetPostResponse> => {
  return await getPostApi(postId, token);
};

export const collectOrUnCollectPost = async (
  request: CollectPostRequest,
  token: string,
): Promise<void> => {
  return await collectOrUnCollectPostApi(request, token);
};

export const heatOrUnHeatPost = async (
  request: HeatPostRequest,
  token: string,
): Promise<void> => {
  return await heatOrUnHeatPostApi(request, token);
};

export const getPostComments = async (
  request: GetPostCommentsRequest,
  token: string,
): Promise<PostCommentData[]> => {
  return await getPostCommentsApi(request, token);
};

export const likeOrUnlikeComment = async (
  request: LikeCommentRequest,
  token: string,
): Promise<void> => {
  return await likeOrUnlikeCommentApi(request, token);
};

export const commentPost = async (
  request: CommentPostRequest,
  token: string,
): Promise<CommentPostResponse> => {
  return await comentPostApi(request, token);
};
