import axios from 'axios';
import { appConfig } from '@/config/app';

export const api = axios.create({
  baseURL: typeof window === 'undefined' ? `${appConfig.nextAuthUrl}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
