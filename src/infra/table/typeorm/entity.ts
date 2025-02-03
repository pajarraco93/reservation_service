import { Table } from '@domain/table/model';
import { Column, Entity } from 'typeorm';

@Entity('tables')
export class TableEntity implements Table {
  @Column({ type: 'varchar', primary: true })
  public id!: string;

  @Column({ type: 'int' })
  public capacity!: number;
}
