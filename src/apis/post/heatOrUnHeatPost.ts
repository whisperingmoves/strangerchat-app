import axiosInstance from '../axios';

export interface HeatPostRequest {
  postId: string;
  action: number;
}

export const heatOrUnHeatPost = async (
  request: HeatPostRequest,
  token: string,
): Promise<void> => {
  const {postId, action} = request;

  await axiosInstance.post(`/posts/${postId}/heat?action=${action}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
