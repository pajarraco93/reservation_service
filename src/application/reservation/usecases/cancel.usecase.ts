import { Reservation, ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { NotFoundError } from '@shared/errors';

import { CancelReservationUsecase, CancelReservationUsecaseInput } from './cancel.port';

export interface CancelReservationUsecaseProps {
  reservationRepository: ReservationRepository;
}

export const cancelReservationUsecase = ({
  reservationRepository
}: CancelReservationUsecaseProps): CancelReservationUsecase => {
  const execute = (input: CancelReservationUsecaseInput): Reservation => {
    const cancelled = reservationRepository.updateReservation(
      input.reservationId,

      {
        status: ReservationStatus.CANCELLED
      }
    );

    if (!cancelled) {
      throw new NotFoundError(`Reservation #${input.reservationId} not found`);
    }

    return cancelled;
  };

  return { execute };
};
