import { Reservation, ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { NotFoundError } from '@shared/errors';

import { GetReservationUsecase } from './get.port';
import { getReservationUsecase } from './get.usecase';

const mockReservationRepository = {
  getReservation: jest.fn()
};

describe('getReservationUsecase', () => {
  let usecase: GetReservationUsecase;

  beforeEach(() => {
    jest.clearAllMocks();
    usecase = getReservationUsecase({
      reservationRepository: mockReservationRepository as unknown as ReservationRepository
    });
  });

  it('should return a reservation when found', () => {
    const mockReservation: Reservation = {
      id: '123',
      startsAt: new Date('2025-02-04T10:00:00Z'),
      endsAt: new Date('2025-02-04T12:00:00Z'),
      status: ReservationStatus.RESERVED,
      table: { id: 'table1' }
    } as Reservation;

    mockReservationRepository.getReservation.mockReturnValue(mockReservation);

    const result = usecase.execute({ reservationId: '123' });

    expect(result).toEqual(mockReservation);
    expect(mockReservationRepository.getReservation).toHaveBeenCalledWith('123');
    expect(mockReservationRepository.getReservation).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundError when reservation does not exist', () => {
    mockReservationRepository.getReservation.mockReturnValue(undefined);

    expect(() => usecase.execute({ reservationId: '999' })).toThrow(
      new NotFoundError('Reservation #999 not found')
    );

    expect(mockReservationRepository.getReservation).toHaveBeenCalledWith('999');
    expect(mockReservationRepository.getReservation).toHaveBeenCalledTimes(1);
  });
});
