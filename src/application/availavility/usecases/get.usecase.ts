import { ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';
import { TableRepository } from '@domain/table/repository.port';

import { GetAvailabilityUsecase, GetAvailabilityUsecaseInput } from './get.port';

export interface GetAvailabilityUsecaseProps {
  reservationRepository: ReservationRepository;
  tableRepository: TableRepository;
}

const OPENING_TIME = 12;
const CLOSING_TIME = 22;
const SLOT_DURATION = 15;

export const getAvailabilityUsecase = ({
  reservationRepository,
  tableRepository
}: GetAvailabilityUsecaseProps): GetAvailabilityUsecase => {
  const slotGenerator = (
    date: Date,
    openingHour: number,
    closingHour: number,
    slotDuration: number
  ): Date[] => {
    const slots: Date[] = [];
    const start = new Date(date);
    const end = new Date(start);

    start.setHours(openingHour, 0, 0, 0);
    end.setHours(closingHour, 0, 0, 0);

    while (start < end) {
      slots.push(new Date(start));
      start.setMinutes(start.getMinutes() + slotDuration);
    }

    return slots;
  };

  const execute = (input: GetAvailabilityUsecaseInput): Date[] => {
    const { datetime, partySize } = input;

    const tables = tableRepository.getTablesWithCapacity(partySize);
    const reservations = reservationRepository.getReservationsForDayWithStatus(
      datetime,
      ReservationStatus.RESERVED
    );

    const timeSlots = slotGenerator(datetime, OPENING_TIME, CLOSING_TIME, SLOT_DURATION);

    const occupiedTablesByTimeSlot = new Map<string, Set<string>>();
    reservations.forEach((reservation) => {
      timeSlots.forEach((timeSlot) => {
        if (timeSlot >= reservation.startsAt && timeSlot < reservation.endsAt) {
          const slotKey = timeSlot.toISOString();
          if (!occupiedTablesByTimeSlot.has(slotKey)) {
            occupiedTablesByTimeSlot.set(slotKey, new Set());
          }
          occupiedTablesByTimeSlot.get(slotKey)?.add(reservation.table!.id);
        }
      });
    });

    return timeSlots.reduce((acc: Date[], timeSlot: Date) => {
      const slotKey = timeSlot.toISOString();
      const occupiedTableIds = occupiedTablesByTimeSlot.get(slotKey) || new Set();

      if (tables.filter((table) => !occupiedTableIds.has(table.id)).length) {
        return acc.concat(timeSlot);
      }

      return acc;
    }, []);
  };

  return { execute };
};
