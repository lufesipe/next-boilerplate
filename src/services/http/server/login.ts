import { api } from '..';
import { apiConfig } from '@/config/api';

export const login = async (credentials: LoginPayload) => {
  const { data, status } = await api.post(apiConfig.routes.login, credentials);
  if (status !== 200) {
    return null;
  }
  return data;
};

export type LoginPayload = {
  email: string;
  password: string;
};
