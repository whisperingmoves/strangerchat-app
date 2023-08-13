import {USER} from '../../constants/home/Config';

export const getUsername = (userId: string): string => {
  const lastSixDigits = userId.slice(-6);
  return `${USER}_${lastSixDigits}`;
};
