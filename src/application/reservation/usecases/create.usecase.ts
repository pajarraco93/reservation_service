import { Reservation, ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { v4 as uuidv4 } from 'uuid';

import { FindAvailableTableUsecase } from '../table/findAvailable.port';

import { CreateReservationUsecase, CreateReservationUsecaseInput } from './create.port';

export interface CreateReservationUsecaseProps {
  findAvailableTableUsecase: FindAvailableTableUsecase;
  reservationRepository: ReservationRepository;
}

export const RESERVATION_DURATION = 45 * 60 * 1000;

export const createReservationUsecase = ({
  findAvailableTableUsecase,
  reservationRepository
}: CreateReservationUsecaseProps): CreateReservationUsecase => {
  const execute = async (input: CreateReservationUsecaseInput): Promise<Reservation> => {
    const { partySize, customerName, customerEmail, datetime } = input;

    const reservationEndsAt = new Date(datetime.getTime() + RESERVATION_DURATION);
    const reservations = reservationRepository.getReservationsInTime(datetime, reservationEndsAt);
    const table = await findAvailableTableUsecase.execute({
      occupiedTableIds: reservations.map((reservation) => reservation.table!.id),
      partySize
    });

    const reservation: Reservation = {
      id: uuidv4(),
      customerName,
      customerEmail,
      partySize,
      startsAt: datetime,
      endsAt: reservationEndsAt,
      table: table ? table : undefined,
      status: table ? ReservationStatus.RESERVED : ReservationStatus.WAITING
    };

    reservationRepository.createReservation(reservation);

    return reservation;
  };

  return { execute };
};
