export interface User {
  id: number;
  accessToken: string;
  role: string;
  keepLoggedIn?: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export enum roles {
  user = "user",
  admin = "admin"
}
