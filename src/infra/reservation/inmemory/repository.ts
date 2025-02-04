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

  const getReservedInTime = (startsAt: Date, endsAt: Date): Reservation[] => {
    return reservations.filter(
      (reservation) =>
        isOverlapping(reservation.startsAt, reservation.endsAt, startsAt, endsAt) &&
        reservation.status === ReservationStatus.RESERVED &&
        reservation.table
    );
  };

  const getReservedByDate = (datetime: Date): Reservation[] => {
    const normalizedDate = new Date(datetime);
    normalizedDate.setSeconds(0, 0);
    return reservations.filter((reservation) => {
      const normalizedReservationDate = new Date(reservation.startsAt);
      normalizedReservationDate.setSeconds(0, 0);

      return (
        normalizedReservationDate.getTime() === normalizedDate.getTime() &&
        reservation.status === ReservationStatus.RESERVED &&
        reservation.table
      );
    });
  };

  const updateReservation = (
    reservationId: string,
    reservationUpdated: Partial<Reservation>
  ): Reservation | null => {
    const index = reservations.findIndex((reservation) => reservation.id === reservationId);
    if (index === -1) {
      return null;
    }

    const { customerName, customerEmail, status, table } = reservationUpdated;

    reservations[index] = {
      ...reservations[index],
      ...(customerName && { customerName }),
      ...(customerEmail && { customerEmail }),
      ...(status && { status }),
      ...(table && { table })
    };

    return reservations[index];
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
    getReservedInTime,
    getReservedByDate,
    updateReservation,
    resetReservations
  };
};
