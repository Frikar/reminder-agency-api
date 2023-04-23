import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Reminder } from '../../reminders/entities/reminder.entity';

export enum TipoCliente {
  ALTO_VALOR = 'Alto valor',
  NUEVO_CLIENTE = 'Nuevo cliente',
  CONTACTO_NUEVO = 'Contacto nuevo',
  REGULAR = 'Regular',
}

export enum TipoDeServicio {
  UNICO = 'Proyecto único',
  RECURRENTE = 'Servicio recurrente',
  MANTENIMIENTO = 'Mantenimiento mensual',
}

export enum Status {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

export enum TipoCuenta {
  MIEMBRO = 'Miembro',
}

export enum MetodoAdquisicion {
  REFERIDO = 'Referido',
  INSTAGRAM = 'Instagram',
  DIRECTO = 'Directo',
  WEBSITE = 'Website',
}

@Entity({ name: 'clients' })
@Unique(['correoElectronico'])
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({
    type: 'enum',
    enum: MetodoAdquisicion,
    default: MetodoAdquisicion.DIRECTO,
  })
  metodoAdquisicion: MetodoAdquisicion;

  @Column()
  correoElectronico: string;

  @Column()
  ciudad: string;

  @Column()
  pais: string;

  @Column()
  empresa: string;

  @Column()
  sitioWeb: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: TipoCliente,
  })
  tipoCliente: TipoCliente;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVO,
  })
  status?: Status;

  @Column({
    type: 'simple-array',
    enum: TipoDeServicio,
  })
  tipoServicio: TipoDeServicio[];

  @Column({
    type: 'enum',
    enum: TipoCuenta,
    default: TipoCuenta.MIEMBRO,
  })
  tipoCuenta?: TipoCuenta;

  @OneToMany(() => Reminder, (recordatorio) => recordatorio.cliente)
  recordatorios: Reminder[];
}
