import { Table } from '../table/model';

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  partySize: number;
  table?: Table;
  createdAt: Date;
}
