import { Reservation, ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { v4 as uuidv4 } from 'uuid';


import { CreateReservationUsecase, CreateReservationUsecaseInput } from './create.port';
import { FindAvailableTableUsecase } from '../table/findAvailable.port';

export interface CreateReservationUsecaseProps {
  findAvailableTableUsecase: FindAvailableTableUsecase;
  reservationRepository: ReservationRepository;
}

export const createReservationUsecase = ({
  findAvailableTableUsecase,
  reservationRepository
}: CreateReservationUsecaseProps): CreateReservationUsecase => {
  const execute = async (input: CreateReservationUsecaseInput): Promise<Reservation> => {
    const { partySize, customerName, customerEmail, datetime } = input;

    const table = await findAvailableTableUsecase.execute({
      partySize
    });

    const reservation: Reservation = {
      id: uuidv4(),
      customerName,
      customerEmail,
      partySize,
      date: datetime,
      table: table ? table : undefined,
      status: table ? ReservationStatus.RESERVED : ReservationStatus.WAITING
    };

    reservationRepository.createReservation(reservation);

    return reservation;
  };

  return { execute };
};
