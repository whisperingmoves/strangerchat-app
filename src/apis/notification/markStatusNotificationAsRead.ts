import axiosInstance from '../axios';

export const markStatusNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  await axiosInstance.patch(
    `/notifications/status/${notificationId}/read`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return;
};
