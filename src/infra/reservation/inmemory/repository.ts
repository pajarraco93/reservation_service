import { Reservation } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';

let reservations: Reservation[] = [];

export const ReservatioInmemoryRepository = (): ReservationRepository => {
  const createReservation = (reservation: Reservation) => {
    reservations = [...reservations, reservation];
  };

  return {
    createReservation
  };
};
