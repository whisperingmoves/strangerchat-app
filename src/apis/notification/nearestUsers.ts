export interface NearestUser {
  userId: string;
  avatarUrl: string;
  username?: string;
  distance?: number;
}

export interface NearestUsers {
  users?: NearestUser[];
}
