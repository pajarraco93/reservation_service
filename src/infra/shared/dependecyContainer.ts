import { findAvailableTableUsecase } from '@application/reservation/table/findAvailable.usecase';
import { createReservationUsecase } from '@application/reservation/usecases/create.usecase';
import { ReservatioInmemoryRepository } from '@infra/reservation/inmemory/repository';
import { TableInmemoryRepository } from '@infra/table/inmemory/repository';

const tableRepository = TableInmemoryRepository();
const reservationRepository = ReservatioInmemoryRepository();

const findAvailableTable = findAvailableTableUsecase({ tableRepository });
const createReservation = createReservationUsecase({
  findAvailableTableUsecase: findAvailableTable,
  reservationRepository
});

export const container = {
  repositories: {
    table: tableRepository,
    reservation: reservationRepository
  },
  usecases: {
    createReservation,
    findAvailableTable
  }
};
