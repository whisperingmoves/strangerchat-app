import {
  registerUser as registerUserApi,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../apis/user/registerUser';

export const registerUser = async (
  request: RegisterUserRequest,
): Promise<RegisterUserResponse> => {
  return await registerUserApi(request);
};
