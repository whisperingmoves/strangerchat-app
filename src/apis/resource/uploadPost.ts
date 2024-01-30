// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
