import axiosInstance from '../axios';

export interface DeleteCommentRequest {
  commentId: string;
}

export const deleteComment = async (
  request: DeleteCommentRequest,
  token: string,
): Promise<void> => {
  const {commentId} = request;

  await axiosInstance.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
