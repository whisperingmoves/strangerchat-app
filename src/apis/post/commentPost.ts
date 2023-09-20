import axiosInstance from '../axios';

export interface CommentPostRequest {
  postId: string;
  content: string;
  parentId?: string;
}

export interface CommentPostResponse {
  commentId?: string;
}

export const commentPost = async (
  request: CommentPostRequest,
  token: string,
): Promise<CommentPostResponse> => {
  const {postId, content, parentId} = request;

  const requestBody = {
    content,
    parentId,
  };

  const response = await axiosInstance.post(
    `/posts/${postId}/comment`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
