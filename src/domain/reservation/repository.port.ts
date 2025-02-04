import { Reservation, ReservationStatus } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
  getReservation: (reservationId: string) => Reservation | null;
  getReservationsForDayWithStatus: (date: Date, status?: ReservationStatus) => Reservation[];
  getReservationsInTime: (startsAt: Date, endsAt: Date) => Reservation[];
  updateReservation: (reservationUpdated: Partial<Reservation>) => boolean;
  cancelReservation: (reservationId: string) => boolean;
  resetReservations: () => void;
}
