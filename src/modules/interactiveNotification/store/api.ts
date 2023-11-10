import {
  getInteractionNotifications as getInteractionNotificationsApi,
  GetInteractionNotificationsRequest,
  InteractionNotificationData,
} from '../../../apis/notification/getInteractionNotifications';
import {markInteractionNotificationAsRead as markInteractionNotificationAsReadApi} from '../../../apis/notification/markInteractionNotificationAsRead';

export const getInteractionNotifications = async (
  request: GetInteractionNotificationsRequest,
  token: string,
): Promise<InteractionNotificationData[]> => {
  return await getInteractionNotificationsApi(request, token);
};

export const markInteractionNotificationAsRead = async (
  notificationId: string,
  token: string,
): Promise<void> => {
  return await markInteractionNotificationAsReadApi(notificationId, token);
};
