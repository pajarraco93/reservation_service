import { ReservationRepository } from '@domain/reservation/repository.port';

import { CancelReservationUsecase, CancelReservationUsecaseInput } from './cancel.port';

export interface CancelReservationUsecaseProps {
  reservationRepository: ReservationRepository;
}

export const getReservationUsecase = ({
  reservationRepository
}: CancelReservationUsecaseProps): CancelReservationUsecase => {
  const execute = (input: CancelReservationUsecaseInput): boolean => {
    return reservationRepository.cancelReservation(input.reservationId);
  };

  return { execute };
};
