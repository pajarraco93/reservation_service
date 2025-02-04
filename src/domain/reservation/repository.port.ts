import { Reservation } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
  getReservation: (reservationId: string) => Reservation | null;
  getReservationsInTime: (startsAt: Date, endsAt: Date) => Reservation[];
  resetReservations: () => void;
}
