import {
  verifyCode as verifyCodeApi,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from '../../../apis/verification/verifyCode';

export const verifyCode = async (
  request: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  return await verifyCodeApi(request);
};
