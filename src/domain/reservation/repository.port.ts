import { Reservation } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
  getReservationsInTime: (startsAt: Date, endsAt: Date) => Reservation[];
  resetReservations: () => void;
}
