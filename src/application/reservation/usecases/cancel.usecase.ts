import { ReservationRepository } from '@domain/reservation/repository.port';
import { NotFoundError } from '@shared/errors';

import { CancelReservationUsecase, CancelReservationUsecaseInput } from './cancel.port';

export interface CancelReservationUsecaseProps {
  reservationRepository: ReservationRepository;
}

export const cancelReservationUsecase = ({
  reservationRepository
}: CancelReservationUsecaseProps): CancelReservationUsecase => {
  const execute = (input: CancelReservationUsecaseInput): boolean => {
    const cancelled = reservationRepository.cancelReservation(input.reservationId);

    if (!cancelled) {
      throw new NotFoundError(`Reservation #${input.reservationId} not found`);
    }

    return cancelled;
  };

  return { execute };
};
