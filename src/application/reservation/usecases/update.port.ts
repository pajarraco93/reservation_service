import { Reservation } from '@domain/reservation/model';

export interface UpdateReservationUsecaseInput {
  updatedReservation: Partial<Reservation>;
}

export interface UpdateReservationUsecase {
  execute(input: UpdateReservationUsecaseInput): Reservation;
}
