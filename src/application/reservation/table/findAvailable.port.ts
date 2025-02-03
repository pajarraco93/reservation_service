import { Table } from '@domain/table/model';

export interface FindAvailableTableUsecaseInput {
  occupiedTableIds: string[];
  partySize: number;
}

export interface FindAvailableTableUsecase {
  execute(input: FindAvailableTableUsecaseInput): Promise<Table | null>;
}
