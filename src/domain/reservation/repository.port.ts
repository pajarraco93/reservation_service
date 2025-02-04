import { Reservation, ReservationStatus } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
  getReservation: (reservationId: string) => Reservation | null;
  getReservationsForDayWithStatus: (date: Date, status?: ReservationStatus) => Reservation[];
  getReservationsInTime: (startsAt: Date, endsAt: Date) => Reservation[];
  updateReservation: (
    reservationId: string,
    reservationUpdated: Partial<Reservation>
  ) => Reservation | null;
  resetReservations: () => void;
}
