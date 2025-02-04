import { FindAvailableTableUsecase } from '@application/table/usecases/findAvailable.port';
import { ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';

import { UpdateWaitlistUsecase, UpdateWaitlistUsecaseInput } from './updateWaitlist.port';

export interface UpdateWaitlistUsecaseProps {
  reservationRepository: ReservationRepository;
  findAvailableTableUsecase: FindAvailableTableUsecase;
}

export const updateWaitListUsecase = ({
  reservationRepository,
  findAvailableTableUsecase
}: UpdateWaitlistUsecaseProps): UpdateWaitlistUsecase => {
  const execute = (input: UpdateWaitlistUsecaseInput): void => {
    const waitlistedReservations = reservationRepository.getReservationsForDayWithStatus(
      input.datetime,
      ReservationStatus.WAITING
    );

    if (waitlistedReservations.length) {
      const reservations = reservationRepository.getReservationsForDayWithStatus(
        input.datetime,
        ReservationStatus.RESERVED
      );
      const availableTable = findAvailableTableUsecase.execute({
        occupiedTableIds: reservations.map((reservation) => reservation.table!.id),
        partySize: waitlistedReservations[0].partySize
      });

      if (availableTable) {
        reservationRepository.updateReservation(waitlistedReservations[0].id, {
          status: ReservationStatus.RESERVED,
          table: availableTable
        });
      }
    }
  };

  return { execute };
};
