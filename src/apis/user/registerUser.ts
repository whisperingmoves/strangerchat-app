import axiosInstance from '../axios';

export interface RegisterUserRequest {
  mobile: string;
  gender: string;
  birthday: string;
  avatar: string;
  longitude?: number;
  latitude?: number;
  language?: string;
}

export interface RegisterUserResponse {
  token: string;
  userId: string;
}

export const registerUser = async (
  request: RegisterUserRequest,
): Promise<RegisterUserResponse> => {
  const response = await axiosInstance.post('/users/register', request);

  return response.data;
};
