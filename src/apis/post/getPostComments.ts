import axiosInstance from '../axios';

export interface GetPostCommentsRequest {
  postId: string;
  page?: number;
  pageSize?: number;
}

export interface PostCommentData {
  userId: string;
  avatar: string;
  username?: string;
  createTime: number;
  content: string;
  commentId: string;
  isLiked?: number;
  replyUserId?: string;
  replyUsername?: string;
}

export const getPostComments = async (
  request: GetPostCommentsRequest,
  token: string,
): Promise<PostCommentData[]> => {
  const {postId, page, pageSize} = request;

  const response = await axiosInstance.get(`/posts/${postId}/comments`, {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
