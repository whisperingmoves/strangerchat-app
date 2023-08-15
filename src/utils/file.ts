import mime from 'react-native-mime-types';
import RNFS from 'react-native-fs';

export const getFileName = (fileUri: string): string => {
  return fileUri.split('/')[fileUri.split('/').length - 1];
};

export const getFileMimeType = (fileUri: string) => {
  return mime.lookup(fileUri);
};

export const checkFileExistence = async (
  filePath: string,
): Promise<boolean> => {
  return await RNFS.exists(filePath);
};
