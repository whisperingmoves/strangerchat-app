import axiosInstance from '../axios';

export interface GetFriendsRequest {
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

export interface GetFriendsResponse {
  list: UserData[];
  total: number;
}

export const getFriends = async (
  request: GetFriendsRequest,
  token: string,
): Promise<GetFriendsResponse> => {
  const {page, pageSize, keyword} = request;

  const params: GetFriendsRequest = {
    page: page || 1,
    pageSize: pageSize || 10,
  };

  if (keyword) {
    params.keyword = keyword;
  }

  const response = await axiosInstance.get('/users/friends', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
