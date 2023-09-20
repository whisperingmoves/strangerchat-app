import axiosInstance from '../axios';

export interface CollectPostRequest {
  postId: string;
  operation: number;
}

export const collectOrUnCollectPost = async (
  request: CollectPostRequest,
  token: string,
): Promise<void> => {
  const {postId, operation} = request;

  const requestBody = {
    operation,
  };

  await axiosInstance.post(`/posts/${postId}/collect`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
