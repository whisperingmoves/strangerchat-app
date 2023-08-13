interface NearestUser {
  userId: string;
  avatarUrl: string;
  username?: string;
  distance?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NearestUsersResponse {
  users: NearestUser[];
}
