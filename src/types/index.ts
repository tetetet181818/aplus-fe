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
  badgeSales: boolean;
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
  owner_id: string;
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
  isPublish: boolean;
  contactMethod: string;
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
  files: {
    file: File | null;
    cover: File | null;
  };
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

export interface UpdateNoteData {
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

export interface UpdateUserInfo {
  university: string;
}

export interface forgetPasswordData {
  email: string;
}

export interface Student {
  _id: string;
  fullName: string;
  email: string;
  balance: number;
  university: string;
}

/**
 * Represents a sales transaction / payment record.
 */

export interface Sale {
  _id: string;
  user_id: string;
  note_id: string;
  amount: number;
  commission: number;
  status: string;
  payment_method: string;
  note_title: string;
  invoice_id: string;
  message: string;
  platform_fee: string;
  buyerId: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface AcceptedWithdrawal {
  routingNumber: string;
  routingDate: string;
}

export interface Withdrawal {
  _id: string;

  userId: string;

  amount: number;

  status: 'pending' | 'accepted' | 'rejected' | 'completed';

  adminNotes?: string;

  accountName: string;

  bankName: string;

  iban: string;

  routingNumber?: string;

  routingDate?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface ReviewData {
  rating: number;
  comment: string;
}

export interface notificationType {
  _id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRatingTypes {
  _id: string;
  customerId: string;
  rating: number;
  comment: string;
  fullName: string;
  createdAt: string;
  isPublish: boolean;
  updatedAt: string;
}

export interface SalesUser {
  _id: string;
  date: string;
  note_title: string;
  totalProfit: number;
  count: number;
}

export interface Profits {
  _id: string;
  fullName: string;
  email: string;
  balance: number;
  profit: number;
  total: number;
}

export type NoteData = {
  title: string;
  price: number;
  description: string;
  university: string;
  college: string;
  subject: string;
  pagesNumber: number;
  year: number | null;
  contactMethod: string;
  cover: File | null | Object;
  file: File | null | Object;
};
