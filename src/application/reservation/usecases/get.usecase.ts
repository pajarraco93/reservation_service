import { Reservation } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { NotFoundError } from '@shared/errors';

import { GetReservationUsecase, GetReservationUsecaseInput } from './get.port';

export interface GetReservationUsecaseProps {
  reservationRepository: ReservationRepository;
}

export const getReservationUsecase = ({
  reservationRepository
}: GetReservationUsecaseProps): GetReservationUsecase => {
  const execute = (input: GetReservationUsecaseInput): Reservation => {
    const reservation = reservationRepository.getReservation(input.reservationId);

    if (!reservation) {
      throw new NotFoundError(`Reservation #${input.reservationId} not found`);
    }

    return reservation;
  };

  return { execute };
};
