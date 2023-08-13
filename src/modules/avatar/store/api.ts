import {
  uploadAvatar as uploadAvatarApi,
  UploadAvatarResponse,
} from '../../../apis/resource/uploadAvatar';

export const uploadAvatar = async (
  avatar: string,
): Promise<UploadAvatarResponse> => {
  return await uploadAvatarApi(avatar);
};
