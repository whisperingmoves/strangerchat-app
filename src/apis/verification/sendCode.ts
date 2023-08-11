import axiosInstance from '../axios';

export interface SendCodeRequest {
  mobile: string;
}

export const sendCode = async (request: SendCodeRequest): Promise<void> => {
  await axiosInstance.post('/verifications/sendCode', request);
};
