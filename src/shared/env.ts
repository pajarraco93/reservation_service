// eslint-disable-next-line simple-import-sort/imports
import 'dotenv/config';

export const APP_NAME = process.env.APP_NAME;
export const PORT = process.env.PORT || 3000;

export const DATABASE_TYPE = 'postgres';
export const DATABASE_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const DATABASE_USERNAME = process.env.POSTGRES_USER;
export const DATABASE_PASSWORD = process.env.POSTGRES_PASSWORD;
export const DATABASE_NAME = process.env.POSTGRES_DB;
