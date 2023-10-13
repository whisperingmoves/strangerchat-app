import axiosInstance from '../axios';

export interface GetUserDetailRequest {
  userId: number;
}

export interface GetUserDetailResponse {
  avatar: string;
  username?: string;
  city?: string;
  followingCount?: number;
  followersCount?: number;
  visitorsCount?: number;
}

export const getUserDetail = async (
  request: GetUserDetailRequest,
  token: string,
): Promise<GetUserDetailResponse> => {
  const {userId} = request;

  const response = await axiosInstance.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
