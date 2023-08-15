import axiosInstance from '../axios';
import {AxiosHeaders} from 'axios';

export interface CreatePostRequest {
  content: string;
  city?: string;
  longitude?: string;
  latitude?: string;
  images?: string[];
  visibility?: number;
  atUsers?: string[];
}

export interface CreatePostResponse {
  postId: string;
}

export const createPost = async (
  request: CreatePostRequest,
  token: string,
): Promise<CreatePostResponse> => {
  const response = await axiosInstance.post('/posts', request, {
    headers: new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return response.data;
};
