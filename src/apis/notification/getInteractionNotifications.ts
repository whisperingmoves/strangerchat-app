import axiosInstance from '../axios';

export interface GetInteractionNotificationsRequest {
  page?: number;
  pageSize?: number;
}

export interface InteractionNotificationData {
  notificationId: string;
  userAvatar: string;
  userId: string;
  username?: string;
  interactionType: number;
  interactionTime: number;
  postId: string;
  postImage?: string;
  readStatus?: number;
  commentId?: string;
}

export const getInteractionNotifications = async (
  request: GetInteractionNotificationsRequest,
  token: string,
): Promise<InteractionNotificationData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/notifications/interaction', {
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
