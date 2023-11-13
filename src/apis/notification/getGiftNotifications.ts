import axiosInstance from '../axios';

export interface GetGiftNotificationsRequest {
  page?: number;
  pageSize?: number;
}

export interface GiftNotificationData {
  notificationId: string;
  userAvatar: string;
  userId: string;
  username?: string;
  giftQuantity: number;
  giftName: string;
  giftTime: number;
  readStatus?: number;
}

export const getGiftNotifications = async (
  request: GetGiftNotificationsRequest,
  token: string,
): Promise<GiftNotificationData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/notifications/gift', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
