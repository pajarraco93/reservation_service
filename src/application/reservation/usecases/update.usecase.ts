import { ReservationRepository } from '@domain/reservation/repository.port';
import { NotFoundError } from '@shared/errors';

import { UpdateReservationUsecase, UpdateReservationUsecaseInput } from './update.port';

export interface UpdateReservationUsecaseProps {
  reservationRepository: ReservationRepository;
}

export const updateReservationUsecase = ({
  reservationRepository
}: UpdateReservationUsecaseProps): UpdateReservationUsecase => {
  const execute = (input: UpdateReservationUsecaseInput): boolean => {
    const updated = reservationRepository.updateReservation(input.reservationUpdated);

    if (!updated) {
      throw new NotFoundError(`Reservation #${input.reservationUpdated.id} not found`);
    }

    return updated;
  };

  return { execute };
};
