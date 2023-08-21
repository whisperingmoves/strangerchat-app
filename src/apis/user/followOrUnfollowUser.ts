import axiosInstance from '../axios';

export interface FollowUserRequest {
  userId: string;
  action: number;
}

export const followOrUnfollowUser = async (
  request: FollowUserRequest,
  token: string,
): Promise<void> => {
  const {userId, action} = request;

  await axiosInstance.post(`/users/${userId}/follow?action=${action}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
