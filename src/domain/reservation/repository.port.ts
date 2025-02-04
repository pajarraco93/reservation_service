import { Reservation } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
  getReservation: (reservationId: string) => Reservation | null;
  getReservationsInTime: (startsAt: Date, endsAt: Date) => Reservation[];
  updateReservation: (reservationUpdated: Partial<Reservation>) => boolean;
  cancelReservation: (reservationId: string) => boolean;
  resetReservations: () => void;
}
