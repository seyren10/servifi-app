export type LoginCredentials = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type SigninResponse = {
  user: User;
  token: string;
};
