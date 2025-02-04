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

  const getReservationsForDayWithStatus = (
    date: Date,
    status?: ReservationStatus
  ): Reservation[] => {
    const startOfDay = new Date(date.toISOString().split('T')[0]);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    return reservations.filter(
      (reservation) =>
        reservation.startsAt >= startOfDay &&
        reservation.startsAt <= endOfDay &&
        (status ? reservation.status === status : true)
    );
  };

  const getReservationsInTime = (startsAt: Date, endsAt: Date): Reservation[] => {
    return reservations.filter(
      (reservation) =>
        isOverlapping(reservation.startsAt, reservation.endsAt, startsAt, endsAt) &&
        reservation.status === ReservationStatus.RESERVED &&
        reservation.table
    );
  };

  const updateReservation = (reservationUpdated: Partial<Reservation>): boolean => {
    const index = reservations.findIndex((reservation) => reservation.id === reservationUpdated.id);
    if (index === -1) {
      return false;
    }

    reservations[index] = {
      ...reservations[index],
      customerName: reservationUpdated.customerName!,
      customerEmail: reservationUpdated.customerEmail!
    };
    return true;
  };

  const cancelReservation = (reservationId: string): boolean => {
    const index = reservations.findIndex((reservation) => reservation.id === reservationId);
    if (index === -1) {
      return false;
    }

    reservations[index] = { ...reservations[index], status: ReservationStatus.CANCELLED };
    return true;
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
    getReservationsForDayWithStatus,
    getReservationsInTime,
    updateReservation,
    cancelReservation,
    resetReservations
  };
};
