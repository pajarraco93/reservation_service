import { Reservation, ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';

let reservations: Reservation[] = [];

export const ReservatioInmemoryRepository = (): ReservationRepository => {
  const createReservation = (reservation: Reservation) => {
    reservations = [...reservations, reservation];
  };

  const getReservation = (reservationId: string): Reservation | null => {
    const reservation = reservations.find((reservations) => reservations.id === reservationId);
    return reservation ? reservation : null;
  };

  const getReservationsInTime = (startsAt: Date, endsAt: Date): Reservation[] => {
    return reservations.filter(
      (reservation) =>
        isOverlapping(reservation.startsAt, reservation.endsAt, startsAt, endsAt) &&
        reservation.status === ReservationStatus.RESERVED &&
        reservation.table
    );
  };

  const resetReservations = (): void => {
    reservations = [];
  };

  const isOverlapping = (
    startsAtA: Date,
    endsAtA: Date,
    startsAtB: Date,
    endsAtB: Date
  ): boolean => {
    return startsAtA < endsAtB && endsAtA > startsAtB;
  };

  return {
    createReservation,
    getReservation,
    getReservationsInTime,
    resetReservations
  };
};
