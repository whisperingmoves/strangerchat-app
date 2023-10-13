import axiosInstance from '../axios';

export interface GetMyPostsRequest {
  page?: number;
  pageSize?: number;
}

export interface MyPostData {
  postId: string;
  createTime: number;
  content: string;
  images?: string[];
  city?: string;
  atUsers?: {id: string; username?: string}[];
}

export const getMyPosts = async (
  request: GetMyPostsRequest,
  token: string,
): Promise<MyPostData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/users/me/posts', {
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
