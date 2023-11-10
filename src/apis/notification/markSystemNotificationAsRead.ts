import axiosInstance from '../axios';

export const markSystemNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  await axiosInstance.patch(
    `/notifications/system/${notificationId}/read`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return;
};
