import { ReservationEntity } from '@infra/reservation/typeorm/entity';
import { TableEntity } from '@infra/table/typeorm/entity';
import { DataSource, DataSourceOptions } from 'typeorm';

import connectionOptions from './connection.options';

const AppDataSource = new DataSource({
  ...connectionOptions,
  entities: [TableEntity, ReservationEntity],
  migrations: ['dist/**/typeorm/**/migrations/*.js'],
  migrationsRun: false,
  migrationsTransactionMode: 'each',
  logging: ['error']
} as DataSourceOptions);

export const DataSourceManager = AppDataSource.manager;

export default AppDataSource;
