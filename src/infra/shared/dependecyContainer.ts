import { findAvailableTableUsecase } from '@application/reservation/table/findAvailable.usecase';
import { cancelReservationUsecase } from '@application/reservation/usecases/cancel.usecase';
import { createReservationUsecase } from '@application/reservation/usecases/create.usecase';
import { getReservationUsecase } from '@application/reservation/usecases/get.usecase';
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

export const container = {
  repositories: {
    table: tableRepository,
    reservation: reservationRepository
  },
  usecases: {
    createReservation,
    getReservation,
    cancelReservation,
    findAvailableTable
  }
};
