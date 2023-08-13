import {
  CheckinResponse,
  executeCheckin as executeCheckinApi,
} from '../../../apis/user/executeCheckin';

export const executeCheckin = async (
  token: string,
): Promise<CheckinResponse> => {
  return await executeCheckinApi(token);
};
