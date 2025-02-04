import { Table } from './model';

export interface TableRepository {
  getTables: () => Table[];
  getTablesWithCapacity: (partySize: number) => Table[];
}
