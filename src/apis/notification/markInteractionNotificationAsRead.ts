import axiosInstance from '../axios';

export const markInteractionNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  await axiosInstance.patch(
    `/notifications/interaction/${notificationId}/read`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return;
};
