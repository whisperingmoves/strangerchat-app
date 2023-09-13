import axiosInstance from '../axios';

export interface BlockUserRequest {
  userId: string;
  action: number;
}

export const blockOrUnblockUser = async (
  request: BlockUserRequest,
  token: string,
): Promise<void> => {
  const {userId, action} = request;

  await axiosInstance.post(`/users/${userId}/block?action=${action}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
