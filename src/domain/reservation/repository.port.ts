import { Reservation } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
}
