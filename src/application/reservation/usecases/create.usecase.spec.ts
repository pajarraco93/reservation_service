import { ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { Table } from '@domain/table/model';
import { jest } from '@jest/globals';

import { FindAvailableTableUsecase } from '../table/findAvailable.port';

import { CreateReservationUsecase } from './create.port';
import { createReservationUsecase, RESERVATION_DURATION } from './create.usecase';

const mockFindAvailableTableUsecase = {
  execute: jest.fn()
};

const mockReservationRepository = {
  getReservationsInTime: jest.fn(),
  createReservation: jest.fn()
};

describe('createReservationUsecase', () => {
  let usecase: CreateReservationUsecase;

  beforeEach(() => {
    jest.clearAllMocks();
    usecase = createReservationUsecase({
      findAvailableTableUsecase: mockFindAvailableTableUsecase as FindAvailableTableUsecase,
      reservationRepository: mockReservationRepository as unknown as ReservationRepository
    });
  });

  it('should create a reservation with a table when one is available', async () => {
    const datetime = new Date();
    const table: Table = { id: 'table-1', capacity: 4 };
    const input = {
      partySize: 2,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      datetime
    };

    mockReservationRepository.getReservationsInTime.mockReturnValue([]);
    mockFindAvailableTableUsecase.execute.mockReturnValue(table);

    const reservation = await usecase.execute(input);

    expect(reservation).toMatchObject({
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      partySize: input.partySize,
      startsAt: input.datetime,
      endsAt: new Date(datetime.getTime() + RESERVATION_DURATION),
      table,
      status: ReservationStatus.RESERVED
    });
    expect(mockReservationRepository.createReservation).toHaveBeenCalledWith(reservation);
  });

  it('should create a reservation without a table when none is available', async () => {
    const datetime = new Date();
    const input = {
      partySize: 4,
      customerName: 'Jane Doe',
      customerEmail: 'jane@example.com',
      datetime
    };

    mockReservationRepository.getReservationsInTime.mockReturnValue([]);
    mockFindAvailableTableUsecase.execute.mockReturnValue(null);

    const reservation = await usecase.execute(input);

    expect(reservation).toMatchObject({
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      partySize: input.partySize,
      startsAt: input.datetime,
      endsAt: new Date(datetime.getTime() + RESERVATION_DURATION),
      table: undefined,
      status: ReservationStatus.WAITING
    });
    expect(mockReservationRepository.createReservation).toHaveBeenCalledWith(reservation);
  });
});
