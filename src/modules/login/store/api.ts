import {sendCode as sendCodeApi} from '../../../apis/verification/sendCode';

export const sendCode = async (mobile: string): Promise<void> => {
  await sendCodeApi({mobile});
};
