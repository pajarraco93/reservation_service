import { getAvailabilityUsecase } from '@application/availavility/usecases/get.usecase';
import { cancelReservationUsecase } from '@application/reservation/usecases/cancel.usecase';
import { createReservationUsecase } from '@application/reservation/usecases/create.usecase';
import { getReservationUsecase } from '@application/reservation/usecases/get.usecase';
import { updateReservationUsecase } from '@application/reservation/usecases/update.usecase';
import { updateWaitListUsecase } from '@application/reservation/usecases/updateWaitlist.usecase';
import { findAvailableTableUsecase } from '@application/table/usecases/findAvailable.usecase';
import { ReservatioInmemoryRepository } from '@infra/reservation/inmemory/repository';
import { TableInmemoryRepository } from '@infra/table/inmemory/repository';

const tableRepository = TableInmemoryRepository();
const reservationRepository = ReservatioInmemoryRepository();

const findAvailableTable = findAvailableTableUsecase({ tableRepository });
const createReservation = createReservationUsecase({
  findAvailableTableUsecase: findAvailableTable,
  reservationRepository
});
const getReservation = getReservationUsecase({ reservationRepository });
const cancelReservation = cancelReservationUsecase({ reservationRepository });
const updateReservation = updateReservationUsecase({ reservationRepository });
const getAvailability = getAvailabilityUsecase({ reservationRepository, tableRepository });
const updateWaitList = updateWaitListUsecase({
  reservationRepository,
  findAvailableTableUsecase: findAvailableTable
});

export const container = {
  repositories: {
    table: tableRepository,
    reservation: reservationRepository
  },
  usecases: {
    createReservation,
    getReservation,
    updateReservation,
    cancelReservation,
    findAvailableTable,
    getAvailability,
    updateWaitList
  }
};
