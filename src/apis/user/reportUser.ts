import axiosInstance from '../axios';

export interface ReportUserRequest {
  userId: string;
}

export const reportUser = async (
  request: ReportUserRequest,
  token: string,
): Promise<void> => {
  const {userId} = request;

  await axiosInstance.post(`/users/${userId}/report`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
