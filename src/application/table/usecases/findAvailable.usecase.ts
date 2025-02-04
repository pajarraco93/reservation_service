import { Table } from '@domain/table/model';
import { TableRepository } from '@domain/table/repository.port';

import { FindAvailableTableUsecase, FindAvailableTableUsecaseInput } from './findAvailable.port';

export interface CreateReservationUsecaseProps {
  tableRepository: TableRepository;
}

export const findAvailableTableUsecase = ({
  tableRepository
}: CreateReservationUsecaseProps): FindAvailableTableUsecase => {
  const execute = (input: FindAvailableTableUsecaseInput): Table | null => {
    const { partySize, occupiedTableIds } = input;
    const tables = tableRepository.getTablesWithCapacity(partySize);

    return tables.find((table) => !occupiedTableIds.includes(table.id)) || null;
  };

  return { execute };
};
