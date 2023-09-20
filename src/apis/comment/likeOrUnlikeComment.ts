import axiosInstance from '../axios';

export interface LikeCommentRequest {
  commentId: string;
  operation: number;
}

export const likeOrUnlikeComment = async (
  request: LikeCommentRequest,
  token: string,
): Promise<void> => {
  const {commentId, operation} = request;

  const requestBody = {
    operation,
  };

  await axiosInstance.post(`/comments/${commentId}/like`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
