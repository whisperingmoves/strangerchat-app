import axiosInstance from '../axios';

export interface HotPost {
  postId: string;
  userId: string;
  username?: string;
  content: string;
  hotIndex?: number;
}

export const getHotPosts = async (token: string): Promise<HotPost[]> => {
  const response = await axiosInstance.get('/posts/hot', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
