import {
  getSystemNotifications as getSystemNotificationsApi,
  GetSystemNotificationsRequest,
  SystemNotificationData,
} from '../../../apis/notification/getSystemNotifications';
import {markSystemNotificationAsRead as markSystemNotificationAsReadApi} from '../../../apis/notification/markSystemNotificationAsRead';

export const getSystemNotifications = async (
  request: GetSystemNotificationsRequest,
  token: string,
): Promise<SystemNotificationData[]> => {
  return await getSystemNotificationsApi(request, token);
};

export const markSystemNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  return await markSystemNotificationAsReadApi(notificationId, token);
};
