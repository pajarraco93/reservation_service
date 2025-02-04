import { Reservation } from '@domain/reservation/model';

export interface CreateReservationUsecaseInput {
  customerName: string;
  customerEmail: string;
  partySize: number;
  datetime: Date;
}

export interface CreateReservationUsecase {
  execute(input: CreateReservationUsecaseInput): Reservation;
}
