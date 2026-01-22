import { api, apiError } from './api';
import { User } from '../types/auth';

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res= await api.post('/api/auth/login', data);
    return res.data.data;
  } catch (error) {
      apiError(error);
  }
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post('/api/auth/register', data);
    return res.data;
  } catch (error) {
      apiError(error);
  }
};

export const logoutUser = async () => {
  await api.post('/api/auth/logout');
};

export const fetchMe = async (): Promise<User | null> => {
  try {
    const res = await api.get('/api/auth/me');
    return res.data.user || null;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null;
    }
    apiError(err);
    return null;
  }
};

