import axiosInstance from '../axios';

export interface GetSystemNotificationsRequest {
  page?: number;
  pageSize?: number;
}

export interface SystemNotificationData {
  notificationId: string;
  notificationTitle: string;
  notificationContent: string;
  notificationTime: number;
  readStatus?: number;
}

export const getSystemNotifications = async (
  request: GetSystemNotificationsRequest,
  token: string,
): Promise<SystemNotificationData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/notifications/system', {
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
