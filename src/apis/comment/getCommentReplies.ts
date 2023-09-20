import axiosInstance from '../axios';

export interface GetCommentRepliesRequest {
  commentId: string;
  page?: number;
  pageSize?: number;
}

export interface CommentReplyData {
  userId: string;
  avatar: string;
  username?: string;
  createTime: number;
  content: string;
  commentId: string;
  isLiked?: number;
}

export const getCommentReplies = async (
  request: GetCommentRepliesRequest,
  token: string,
): Promise<CommentReplyData[]> => {
  const {commentId, page, pageSize} = request;

  const response = await axiosInstance.get(`/comments/${commentId}/replies`, {
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
