import { Table } from '../table/model';

export enum ReservationStatus {
  RESERVED = 'reserved',
  WAITING = 'wating',
  CANCELLED = 'canceller'
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  partySize: number;
  date: Date;
  table?: Table;
  status: ReservationStatus;
}
