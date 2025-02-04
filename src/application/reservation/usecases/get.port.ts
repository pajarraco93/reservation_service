import { Reservation } from '@domain/reservation/model';

export interface GetReservationUsecaseInput {
  reservationId: string;
}

export interface GetReservationUsecase {
  execute(input: GetReservationUsecaseInput): Reservation;
}
