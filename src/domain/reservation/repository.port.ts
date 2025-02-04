import { Reservation, ReservationStatus } from './model';

export interface ReservationRepository {
  createReservation: (reservation: Reservation) => void;
  getReservation: (reservationId: string) => Reservation | null;
  getReservationsForDayWithStatus: (date: Date, status?: ReservationStatus) => Reservation[];
  getReservedInTime: (startsAt: Date, endsAt: Date) => Reservation[];
  getReservedByDate: (datetime: Date) => Reservation[];
  updateReservation: (
    reservationId: string,
    reservationUpdated: Partial<Reservation>
  ) => Reservation | null;
  resetReservations: () => void;
}
