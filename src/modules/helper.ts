import Config from 'react-native-config';

export const generateFullURL = (serverURL: string): string => {
  const baseURL = Config.BASE_URL as string;

  // 检查基础URL是否以斜杠结尾，避免重复斜杠
  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';

  // 检查服务器返回的URL是否以斜杠开头，避免重复斜杠
  const normalizedServerURL = serverURL.startsWith('/')
    ? serverURL.substring(1)
    : serverURL;

  // 拼接基础URL和服务器返回的URL
  return normalizedBaseURL + normalizedServerURL;
};
