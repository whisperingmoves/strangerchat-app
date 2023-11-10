import {
  getStatusNotifications as getStatusNotificationsApi,
  GetStatusNotificationsRequest,
  StatusNotificationData,
} from '../../../apis/notification/getStatusNotifications';
import {markStatusNotificationAsRead as markStatusNotificationAsReadApi} from '../../../apis/notification/markStatusNotificationAsRead';

export const getStatusNotifications = async (
  request: GetStatusNotificationsRequest,
  token: string,
): Promise<StatusNotificationData[]> => {
  return getStatusNotificationsApi(request, token);
};

export const markStatusNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  return markStatusNotificationAsReadApi(notificationId, token);
};
