import Config from 'react-native-config';
import axiosInstance from '../axios';
import {getFileMimeType, getFileName} from '../../utils/file';
import {AxiosHeaders} from 'axios';

export interface UploadPostResponse {
  url: string;
}

export const uploadPost = async (
  photo: string,
): Promise<UploadPostResponse> => {
  const formData = new FormData();
  formData.append('post', {
    uri: photo,
    name: getFileName(photo),
    type: getFileMimeType(photo),
  });

  const response = await axiosInstance.post('/uploadPost', formData, {
    headers: new AxiosHeaders({
      Authorization: `Bearer ${Config.UPLOAD_TOKEN}`,
      'Content-Type': 'multipart/form-data',
    }),
  });

  return response.data;
};
