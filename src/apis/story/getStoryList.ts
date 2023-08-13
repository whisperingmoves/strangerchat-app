import axiosInstance from '../axios';
import {AxiosHeaders} from 'axios';

export interface Story {
  userId: string;
  avatar: string;
  createTime: number;
  username?: string;
  relation?: number;
  firstImage?: string;
  online?: number;
}

export const getStoryList = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<Story[]> => {
  const response = await axiosInstance.get('/stories', {
    params: {
      page,
      pageSize,
    },
    headers: new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return response.data;
};
