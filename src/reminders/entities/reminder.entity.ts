import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

export enum TipoRecordatorio {
  RECURRENTE = 'Recurrente',
  UNICO = 'Unico',
  PRIORITARIO = 'Prioritario',
}

export enum StatusRecordatorio {
  PROGRAMADO = 'Programado',
  INICIADO = 'Iniciado',
  PAUSADO = 'Pausado',
  COMPLETADO = 'Completado',
  ADVERTENCIA = 'Advertencia',
}

@Entity('recordatorios')
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreRecordatorio: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  precioServicio: number;

  @Column({ type: 'date' })
  fechaRecordatorio: Date;

  @Column({
    type: 'enum',
    enum: TipoRecordatorio,
    default: TipoRecordatorio.UNICO,
  })
  tipoRecordatorio: TipoRecordatorio;

  @Column({
    type: 'enum',
    enum: StatusRecordatorio,
    default: StatusRecordatorio.PROGRAMADO,
  })
  status: string;

  @Column({ default: false })
  pinned: boolean;

  @ManyToOne(() => Client, (cliente) => cliente.recordatorios, {
    onDelete: 'CASCADE',
  })
  cliente: Client;
}
