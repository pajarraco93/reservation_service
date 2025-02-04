import { Reservation, ReservationStatus } from '@domain/reservation/model';
import { ReservationRepository } from '@domain/reservation/repository.port';

import { ReservatioInmemoryRepository } from './repository';

describe('ReservatioInmemoryRepository', () => {
  let repository: ReservationRepository;

  beforeEach(() => {
    repository = ReservatioInmemoryRepository();
  });

  afterEach(() => {
    repository.resetReservations();
  });

  it('createReservation should create a reservation', () => {
    const reservation: Reservation = {
      id: '1',
      startsAt: new Date('2025-02-04T12:00:00Z'),
      endsAt: new Date('2025-02-04T14:00:00Z'),
      status: ReservationStatus.RESERVED,
      table: { id: 'Table1' }
    } as Reservation;

    repository.createReservation(reservation);

    const reservations = repository.getReservationsInTime(
      new Date('2025-02-04T12:30:00Z'),
      new Date('2025-02-04T13:30:00Z')
    );

    expect(reservations).toHaveLength(1);
    expect(reservations[0]).toEqual(reservation);
  });

  it('getReservationsInTime should return only reservations that overlap', () => {
    const reservation1: Reservation = {
      id: '1',
      startsAt: new Date('2025-02-04T12:00:00Z'),
      endsAt: new Date('2025-02-04T14:00:00Z'),
      status: ReservationStatus.RESERVED,
      table: { id: 'Table1' }
    } as Reservation;

    const reservation2: Reservation = {
      id: '2',
      startsAt: new Date('2025-02-04T15:00:00Z'),
      endsAt: new Date('2025-02-04T16:00:00Z'),
      status: ReservationStatus.RESERVED,
      table: { id: 'Table2' }
    } as Reservation;

    repository.createReservation(reservation1);
    repository.createReservation(reservation2);

    const overlappingReservations = repository.getReservationsInTime(
      new Date('2025-02-04T12:30:00Z'),
      new Date('2025-02-04T13:30:00Z')
    );

    expect(overlappingReservations).toHaveLength(1);
    expect(overlappingReservations[0].id).toBe(reservation1.id);
  });

  it('getReservationsInTime should not return reservations with status different from RESERVED', () => {
    const reservation: Reservation = {
      id: '1',
      startsAt: new Date('2025-02-04T12:00:00Z'),
      endsAt: new Date('2025-02-04T14:00:00Z'),
      status: ReservationStatus.CANCELLED,
      table: { id: 'Table2' }
    } as Reservation;

    repository.createReservation(reservation);

    const reservations = repository.getReservationsInTime(
      new Date('2025-02-04T12:30:00Z'),
      new Date('2025-02-04T13:30:00Z')
    );

    expect(reservations).toHaveLength(0);
  });

  it('getReservationsInTime should not return reservations if they do not overlap', () => {
    const reservation: Reservation = {
      id: '1',
      startsAt: new Date('2025-02-04T10:00:00Z'),
      endsAt: new Date('2025-02-04T11:00:00Z'),
      status: ReservationStatus.RESERVED,
      table: { id: 'Table1' }
    } as Reservation;

    repository.createReservation(reservation);

    const reservations = repository.getReservationsInTime(
      new Date('2025-02-04T12:00:00Z'),
      new Date('2025-02-04T13:00:00Z')
    );

    expect(reservations).toHaveLength(0);
  });

  it('cancelReservation should not return false because reservation does not exist', () => {
    const result = repository.cancelReservation('999');
    expect(result).toBeFalsy();
  });

  it('cancelReservation should not return true and reservation should have a cancelled status', () => {
    const reservation: Reservation = {
      id: '1',
      startsAt: new Date('2025-02-04T10:00:00Z'),
      endsAt: new Date('2025-02-04T11:00:00Z'),
      status: ReservationStatus.RESERVED,
      table: { id: 'Table1' }
    } as Reservation;

    repository.createReservation(reservation);

    const result = repository.cancelReservation(reservation.id);

    const cancelled = repository.getReservation(reservation.id);
    expect(result).toBeTruthy();
    expect(cancelled?.status).toBe(ReservationStatus.CANCELLED);
  });
});
