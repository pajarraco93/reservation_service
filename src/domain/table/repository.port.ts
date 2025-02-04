import { Table } from './model';

export interface TableRepository {
  getTables: () => Table[];
}
