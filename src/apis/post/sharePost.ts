import axiosInstance from '../axios';

export interface SharePostRequest {
  postId: string;
}

export const sharePost = async (
  request: SharePostRequest,
  token: string,
): Promise<void> => {
  const {postId} = request;

  await axiosInstance.post(`/posts/${postId}/share`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
