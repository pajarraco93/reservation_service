import { FindAvailableTableUsecase } from '@application/table/usecases/findAvailable.port';
import { ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { jest } from '@jest/globals';

import { UpdateWaitlistUsecase } from './updateWaitlist.port';
import { updateWaitListUsecase } from './updateWaitlist.usecase';

const mockReservationRepository = {
  getReservationsForDayWithStatus: jest.fn(),
  updateReservation: jest.fn()
};

const mockFindAvailableTableUsecase = {
  execute: jest.fn()
};

describe('updateWaitListUsecase', () => {
  let usecase: UpdateWaitlistUsecase;

  const waitlistedReservation = { id: '2', partySize: 4, status: ReservationStatus.WAITING };
  const table = { id: 'Table1' };
  const reservation = { id: '1', partySize: 4, status: ReservationStatus.RESERVED, table };

  beforeEach(() => {
    jest.clearAllMocks();

    usecase = updateWaitListUsecase({
      reservationRepository: mockReservationRepository as unknown as ReservationRepository,
      findAvailableTableUsecase:
        mockFindAvailableTableUsecase as unknown as FindAvailableTableUsecase
    });
  });

  it('should do nothing if there are no waitlisted reservations', () => {
    mockReservationRepository.getReservationsForDayWithStatus.mockReturnValueOnce([]);
    usecase.execute({ datetime: new Date() });
    expect(mockReservationRepository.getReservationsForDayWithStatus).toHaveBeenCalledTimes(1);
    expect(mockFindAvailableTableUsecase.execute).not.toHaveBeenCalled();
    expect(mockReservationRepository.updateReservation).not.toHaveBeenCalled();
  });

  it('should attempt to find an available table if waitlisted reservations exist', () => {
    mockReservationRepository.getReservationsForDayWithStatus
      .mockReturnValueOnce([waitlistedReservation])
      .mockReturnValueOnce([reservation]);
    mockFindAvailableTableUsecase.execute.mockReturnValueOnce(table);

    usecase.execute({ datetime: new Date() });
    expect(mockFindAvailableTableUsecase.execute).toHaveBeenCalled();
  });

  it('should update reservation if an available table is found', () => {
    mockReservationRepository.getReservationsForDayWithStatus
      .mockReturnValueOnce([waitlistedReservation])
      .mockReturnValueOnce([reservation]);
    mockFindAvailableTableUsecase.execute.mockReturnValue(table);

    usecase.execute({ datetime: new Date() });

    expect(mockReservationRepository.updateReservation).toHaveBeenCalledWith(
      waitlistedReservation.id,
      {
        status: ReservationStatus.RESERVED,
        table
      }
    );
  });

  it('should not update reservation if no table is available', () => {
    mockReservationRepository.getReservationsForDayWithStatus
      .mockReturnValueOnce([waitlistedReservation])
      .mockReturnValueOnce([reservation]);
    mockFindAvailableTableUsecase.execute.mockReturnValue(null);

    usecase.execute({ datetime: new Date() });

    expect(mockReservationRepository.updateReservation).not.toHaveBeenCalled();
  });
});
