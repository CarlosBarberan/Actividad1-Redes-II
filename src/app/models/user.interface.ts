export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
  token?: string;
} 