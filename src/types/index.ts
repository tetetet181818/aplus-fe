export type User = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  university: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
