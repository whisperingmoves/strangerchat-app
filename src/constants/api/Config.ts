export const BAD_REQUEST = 'Bad Request';

export const FORBIDDEN = 'Access Forbidden';

export const NOT_FOUND = 'Resource Not Found';

export const TOO_MANY_REQUESTS = (retryAfter: string) =>
  `Too Many Requests. Please retry after ${retryAfter} seconds.`;

export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
