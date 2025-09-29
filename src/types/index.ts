export interface Like {
  noteId: string;
}

export type User = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  university: string;
  role: string;
  balance: number;
  withdrawalTimes: number;
  likesList?: Like[];
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
  _id: string;
  title: string;
  description: string;
  price: number;
  downloads?: number;
  cover_url?: string;
  file_path?: string;
  pagesNumber?: number;
  subject: string;
  year: number;
  rating: number;
  university: string;
  college: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  note_id: string;
  user_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export type FormValues = {
  cover: File;
  title: string;
  price: number;
  description: string;
  university: string;
  college: string;
  subject: string;
  pagesNumber: number;
  year: number;
  contactMethod: string;
  fileUploaded: boolean;
  imageUploaded: boolean;
  termsAccepted: boolean;
};

export interface CreateNoteData {
  title: string;
  description: string;
  price: number;
  pages_number?: number;
  subject: string;
  year: number;
  university: string;
  college: string;
  cover: File;
  file: File;
}

export interface withdrawalData {
  amount: number;
  accountName: string;
  bankName: string;
  iban: string;
}
