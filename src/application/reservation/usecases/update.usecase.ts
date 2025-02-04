import { Reservation } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { NotFoundError } from '@shared/errors';

import { UpdateReservationUsecase, UpdateReservationUsecaseInput } from './update.port';

export interface UpdateReservationUsecaseProps {
  reservationRepository: ReservationRepository;
}

export const updateReservationUsecase = ({
  reservationRepository
}: UpdateReservationUsecaseProps): UpdateReservationUsecase => {
  const execute = (input: UpdateReservationUsecaseInput): Reservation => {
    const updated = reservationRepository.updateReservation(
      input.updatedReservation.id!,
      input.updatedReservation
    );

    if (!updated) {
      throw new NotFoundError(`Reservation #${input.updatedReservation.id} not found`);
    }

    return updated;
  };

  return { execute };
};
