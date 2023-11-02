import axiosInstance from '../axios';

export interface GetFollowingUsersRequest {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface UserData {
  userId: string;
  userAvatar: string;
  username?: string;
  latestPostContent?: string;
  conversationId?: string;
  isFollowed?: number;
}

export const getFollowingUsers = async (
  request: GetFollowingUsersRequest,
  token: string,
): Promise<UserData[]> => {
  const {page, pageSize, keyword} = request;

  const params: GetFollowingUsersRequest = {
    page: page || 1,
    pageSize: pageSize || 10,
  };

  if (keyword) {
    params.keyword = keyword;
  }

  const response = await axiosInstance.get('/users/following', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
