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
    return tableRepository.getTables().find((table) => table.capacity >= input.partySize) || null;
  };

  return { execute };
};
