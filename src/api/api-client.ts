import axios from 'axios';
import { config } from '@/config';

export const apiClient = axios.create({
  baseURL: config.API_URL,
});

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
} as const;
