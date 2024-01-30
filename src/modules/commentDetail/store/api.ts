// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
