import mime from 'react-native-mime-types';

export const getFileName = (fileUri: string): string => {
  return fileUri.split('/')[fileUri.split('/').length - 1];
};

export const getFileMimeType = (fileUri: string) => {
  return mime.lookup(fileUri);
};
