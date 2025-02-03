import { Table } from '@domain/table/model';
import { TableRepository } from '@domain/table/repository.port';

const tables: Table[] = [
  { id: '1', capacity: 2 },
  { id: '2', capacity: 4 },
  { id: '3', capacity: 6 }
];

export const TableInmemoryRepository = (): TableRepository => {
  const getTables = () => tables;

  return {
    getTables
  };
};
