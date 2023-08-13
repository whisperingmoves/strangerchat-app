import Config from 'react-native-config';
import axiosInstance from '../axios';
import {getFileMimeType, getFileName} from '../../utils/file';
import {AxiosHeaders} from 'axios';

export interface UploadAvatarResponse {
  url: string;
}

export const uploadAvatar = async (
  avatar: string,
): Promise<UploadAvatarResponse> => {
  const formData = new FormData();
  formData.append('avatar', {
    uri: avatar,
    name: getFileName(avatar),
    type: getFileMimeType(avatar),
  });

  const response = await axiosInstance.post('/uploadAvatar', formData, {
    headers: new AxiosHeaders({
      Authorization: `Bearer ${Config.UPLOAD_TOKEN}`,
      'Content-Type': 'multipart/form-data',
    }),
  });

  return response.data;
};
