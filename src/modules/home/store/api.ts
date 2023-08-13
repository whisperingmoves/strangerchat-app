import {
  getStoryList as getStoryListApi,
  Story,
} from '../../../apis/story/getStoryList';

export const getStoryList = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<Story[]> => {
  return await getStoryListApi(page, pageSize, token);
};
