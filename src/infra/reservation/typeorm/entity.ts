import { Reservation } from '@domain/reservation/model';
import { Table } from '@domain/table/model';
import { TableEntity } from '@infra/table/typeorm/entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('reservations')
export class ReservationEntity implements Reservation {
  @Column({ type: 'varchar', primary: true })
  public id!: string;

  @Column({ type: 'varchar', name: 'customer_name' })
  public customerName!: string;

  @Column({ type: 'varchar', name: 'customer_email' })
  public customerEmail!: string;

  @Column({ type: 'int', name: 'party_size' })
  public partySize!: number;

  @ManyToOne(() => TableEntity)
  @JoinColumn({ name: 'client_id' })
  public table!: Table;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;
}
