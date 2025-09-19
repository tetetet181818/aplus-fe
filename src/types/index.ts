export type User = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  university: string;
  role: string;
  balance: number;
  withdrawal_times: number;
  createdAt: string;
  updatedAt: string;
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

export interface Note {
  id: string;
  title: string;
  description: string;
  price: number;
  downloads?: number;
  cover_url?: string;
  file_path?: string;
  rating: object[];
}
