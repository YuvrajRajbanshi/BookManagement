export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
