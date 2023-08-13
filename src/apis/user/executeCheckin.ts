import axiosInstance from '../axios';
import {AxiosHeaders} from 'axios';

export interface CheckinResponse {
  checkedDays: number;
}

export const executeCheckin = async (
  token: string,
): Promise<CheckinResponse> => {
  const response = await axiosInstance.post('/users/checkin/check', null, {
    headers: new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return response.data;
};
