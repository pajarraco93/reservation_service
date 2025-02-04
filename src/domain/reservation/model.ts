import { Table } from '../table/model';

export enum ReservationStatus {
  RESERVED = 'reserved',
  WAITING = 'waiting',
  CANCELLED = 'cancelled'
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  partySize: number;
  startsAt: Date;
  endsAt: Date;
  table?: Table;
  status: ReservationStatus;
}
