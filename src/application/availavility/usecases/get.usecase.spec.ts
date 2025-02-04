import { ReservationRepository } from '@domain/reservation/repository.port';
import { GetAvailabilityUsecase } from './get.port';
import { getAvailabilityUsecase } from './get.usecase';
import { TableRepository } from '@domain/table/repository.port';

const mockReservationRepository = {
  getReservationsForDayWithStatus: jest.fn(),
};

const mockTableRepository = {
  getTablesWithCapacity: jest.fn(),
};

describe('getAvailabilityUsecase', () => {
  let usecase: GetAvailabilityUsecase;

  beforeEach(() => {
    jest.clearAllMocks();
    usecase = getAvailabilityUsecase({
      reservationRepository: mockReservationRepository as unknown as ReservationRepository,
      tableRepository: mockTableRepository as unknown as TableRepository ,
    });
  });

  it('should return all time slots when there are no reservations', () => {
    mockTableRepository.getTablesWithCapacity.mockReturnValue([
      { id: 'table1', capacity: 4 },
      { id: 'table2', capacity: 4 },
    ]);
    mockReservationRepository.getReservationsForDayWithStatus.mockReturnValue([]);

    const input = { datetime: new Date('2025-02-04T12:00:00Z'), partySize: 4 };
    const availability = usecase.execute(input);

    expect(availability.length).toBeGreaterThan(0);
  });

  it('should filter out fully booked time slots', () => {
    mockTableRepository.getTablesWithCapacity.mockReturnValue([
      { id: 'table1', capacity: 4 },
      { id: 'table2', capacity: 4 },
    ]);
    mockReservationRepository.getReservationsForDayWithStatus.mockReturnValue([
      { startsAt: new Date('2025-02-04T12:00:00Z'), endsAt: new Date('2025-02-04T12:30:00Z'), table: { id: 'table1' } },
      { startsAt: new Date('2025-02-04T12:00:00Z'), endsAt: new Date('2025-02-04T12:30:00Z'), table: { id: 'table2' } },
    ]);

    const input = { datetime: new Date('2025-02-04T12:00:00Z'), partySize: 4 };
    const availability = usecase.execute(input);

    expect(availability).not.toContainEqual(new Date('2025-02-04T12:00:00Z'));
  });

  it('should allow reservations in slots with available tables', () => {
    mockTableRepository.getTablesWithCapacity.mockReturnValue([
      { id: 'table1', capacity: 4 },
      { id: 'table2', capacity: 4 },
    ]);
    mockReservationRepository.getReservationsForDayWithStatus.mockReturnValue([
      { startsAt: new Date('2025-02-04T12:00:00Z'), endsAt: new Date('2025-02-04T12:30:00Z'), table: { id: 'table1' } },
    ]);

    const input = { datetime: new Date('2025-02-04T12:00:00Z'), partySize: 4 };
    const availability = usecase.execute(input);

    expect(availability).toContainEqual(new Date('2025-02-04T12:00:00Z'));
  });
});
