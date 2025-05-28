import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BASE_URL || !process.env.STANDARD_USER || !process.env.PASSWORD) {
  throw new Error('Missing required environment variables in .env');
}

export const BASE_URL = process.env.BASE_URL;
export const STANDARD_USER = process.env.STANDARD_USER;
export const PASSWORD = process.env.PASSWORD;