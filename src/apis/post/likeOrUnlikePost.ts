import axiosInstance from '../axios';

export interface LikePostRequest {
  postId: string;
  action: number;
}

export const likeOrUnlikePost = async (
  request: LikePostRequest,
  token: string,
): Promise<void> => {
  const {postId, action} = request;

  await axiosInstance.post(`/posts/${postId}/like?action=${action}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
