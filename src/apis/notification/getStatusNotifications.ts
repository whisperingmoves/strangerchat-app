import axiosInstance from '../axios';

export interface GetStatusNotificationsRequest {
  page?: number;
  pageSize?: number;
}

export interface StatusNotificationData {
  notificationId: string;
  userAvatar: string;
  userId: string;
  username?: string;
  statusType: number;
  statusTime: number;
  readStatus?: number;
}

export const getStatusNotifications = async (
  request: GetStatusNotificationsRequest,
  token: string,
): Promise<StatusNotificationData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/notifications/status', {
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
