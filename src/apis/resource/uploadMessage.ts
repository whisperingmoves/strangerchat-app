import Config from 'react-native-config';
import axiosInstance from '../axios';
import {getFileMimeType, getFileName} from '../../utils/file';
import {AxiosHeaders} from 'axios';

export interface UploadMessageResponse {
  url: string;
}

export const uploadMessage = async (
  photo: string,
): Promise<UploadMessageResponse> => {
  const formData = new FormData();

  formData.append('message', {
    uri: photo,
    name: getFileName(photo),
    type: getFileMimeType(photo),
  });

  const response = await axiosInstance.post('/uploadMessage', formData, {
    headers: new AxiosHeaders({
      Authorization: `Bearer ${Config.UPLOAD_TOKEN}`,
      'Content-Type': 'multipart/form-data',
    }),
  });

  return response.data;
};
