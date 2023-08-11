import {sendCode} from '../../apis/verification/sendCode';

export const sendSMSVerificationCode = async (
  mobile: string,
): Promise<void> => {
  await sendCode({mobile});
};
