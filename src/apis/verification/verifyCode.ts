import axiosInstance from '../axios';

export interface VerifyCodeRequest {
  mobile: string;
  code: string;
  longitude?: number;
  latitude?: number;
  language?: string;
}

export interface VerifyCodeResponse {
  token: string;
  userId: string;
  gender: string;
  birthday: string;
  avatar: string;
  giftsReceived?: number;
  username?: string;
  city?: string;
  followingCount?: number;
  followersCount?: number;
  visitorsCount?: number;
  freeHeatsLeft?: number;
  coinBalance?: number;
  checkedDays?: number;
  lastCheckDate?: number;
}

export const UserNotFoundErrorMessage = 'User Not Found';

export const verifyCode = async (
  request: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  const response = await axiosInstance.post(
    '/verifications/verifyCode',
    request,
  );

  if (response.status === 201) {
    throw new Error(UserNotFoundErrorMessage);
  }

  return response.data;
};
