import { Reservation } from '@domain/reservation/model';

export interface UpdateReservationUsecaseInput {
  reservationUpdated: Reservation;
}

export interface UpdateReservationUsecase {
  execute(input: UpdateReservationUsecaseInput): boolean;
}
