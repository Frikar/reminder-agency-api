import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  IsDecimal,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import {
  StatusRecordatorio,
  TipoRecordatorio,
} from '../entities/reminder.entity';

export class CreateReminderDto {
  @IsNotEmpty()
  nombreRecordatorio: string;

  @IsOptional()
  descripcion?: string;

  @IsNotEmpty()
  fechaRecordatorio: Date;

  @IsNotEmpty()
  @IsDecimal()
  @IsDecimal({ decimal_digits: '0,2' })
  precioServicio: number;

  @IsNotEmpty()
  @IsEnum(TipoRecordatorio)
  tipoRecordatorio?: TipoRecordatorio;

  @IsOptional()
  @IsEnum(StatusRecordatorio)
  status?: string;

  @IsBoolean()
  @IsOptional()
  pinned?: boolean;

  @IsNotEmpty()
  @IsNumber()
  clientId: number;
}
