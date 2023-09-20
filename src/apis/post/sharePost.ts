import axiosInstance from '../axios';

export interface SharePostRequest {
  postId: string;
  sharePlatform: number;
}

export const sharePost = async (
  request: SharePostRequest,
  token: string,
): Promise<void> => {
  const {postId, sharePlatform} = request;

  const requestBody = {
    sharePlatform,
  };

  await axiosInstance.post(`/posts/${postId}/share`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
