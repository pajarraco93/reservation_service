import { Table } from '@domain/table/model';
import { TableRepository } from '@domain/table/repository.port';

import { FindAvailableTableUsecase, FindAvailableTableUsecaseInput } from './findAvailable.port';

export interface CreateReservationUsecaseProps {
  tableRepository: TableRepository;
}

export const findAvailableTableUsecase = ({
  tableRepository
}: CreateReservationUsecaseProps): FindAvailableTableUsecase => {
  const execute = async (input: FindAvailableTableUsecaseInput): Promise<Table | null> => {
    const { partySize, occupiedTableIds } = input;
    const tables = tableRepository
      .getTables()
      .filter((table) => !occupiedTableIds.includes(table.id));

    return tables.find((table) => table.capacity >= partySize) || null;
  };

  return { execute };
};
