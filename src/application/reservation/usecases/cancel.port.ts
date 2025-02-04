import { Reservation } from '@domain/reservation/model';

export interface CancelReservationUsecaseInput {
  reservationId: string;
}

export interface CancelReservationUsecase {
  execute(input: CancelReservationUsecaseInput): Reservation;
}
