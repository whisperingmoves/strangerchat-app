import uuid from 'react-native-uuid';

export const generateUniqueId = (): string => {
  return uuid.v4().toString();
};
