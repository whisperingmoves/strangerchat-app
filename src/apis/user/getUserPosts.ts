import axiosInstance from '../axios';

export interface GetUserPostsRequest {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface UserPostData {
  postId: string;
  createTime: number;
  content: string;
  images?: string[];
  city?: string;
  atUsers?: {id: string; username?: string}[];
}

export const getUserPosts = async (
  request: GetUserPostsRequest,
  token: string,
): Promise<UserPostData[]> => {
  const {userId, page, pageSize} = request;

  const response = await axiosInstance.get(`/users/${userId}/posts`, {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
