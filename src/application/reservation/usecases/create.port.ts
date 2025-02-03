import { Reservation } from '@domain/reservation/model';
import { Table } from '@domain/table/model';

export interface CreateReservationUsecaseInput {
  tables: Table[];
  customerName: string;
  customerEmail: string;
  partySize: number;
  datetime: Date;
}

export interface CreateReservationUsecase {
  execute(input: CreateReservationUsecaseInput): Promise<Reservation>;
}
