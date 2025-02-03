import {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_TYPE,
  DATABASE_USERNAME
} from '@shared/env';
import { DataSourceOptions } from 'typeorm';

const connectionOptions: DataSourceOptions = {
  type: DATABASE_TYPE,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME
};

export default connectionOptions;
