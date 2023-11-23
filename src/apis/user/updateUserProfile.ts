import axiosInstance from '../axios';

export interface UpdateUserProfileRequest {
  avatar?: string;
  username?: string;
  city?: string;
  longitude?: number;
  latitude?: number;
  language?: string;
}

export const updateUserProfile = async (
  request: UpdateUserProfileRequest,
  token: string,
): Promise<void> => {
  await axiosInstance.patch('/users/profile', request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
