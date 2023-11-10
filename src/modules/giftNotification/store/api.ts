import {
  getGiftNotifications as getGiftNotificationsApi,
  GetGiftNotificationsRequest,
  GiftNotificationData,
} from '../../../apis/notification/getGiftNotifications';
import {markGiftNotificationAsRead as markGiftNotificationAsReadApi} from '../../../apis/notification/markGiftNotificationAsRead';

export const getGiftNotifications = async (
  request: GetGiftNotificationsRequest,
  token: string,
): Promise<GiftNotificationData[]> => {
  return await getGiftNotificationsApi(request, token);
};

export const markGiftNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  return await markGiftNotificationAsReadApi(notificationId, token);
};
