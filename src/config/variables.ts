import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config({ path: '.env' });
}

export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_HOST = process.env.DB_HOST || '';
export const DB_DATABASE = process.env.DB_DATABASE || '';
export const DB_HOST_PORT: number = parseInt(process.env.DB_HOST_PORT!) || 5432;