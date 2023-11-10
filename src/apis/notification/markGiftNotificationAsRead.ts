import axiosInstance from '../axios';

export const markGiftNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  await axiosInstance.patch(
    `/notifications/gift/${notificationId}/read`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return;
};
