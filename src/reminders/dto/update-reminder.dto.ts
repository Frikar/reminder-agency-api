import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsDecimal,
} from 'class-validator';
import {
  TipoRecordatorio,
  StatusRecordatorio,
} from '../entities/reminder.entity';

export class UpdateReminderDto {
  @IsOptional()
  @IsNotEmpty()
  nombreRecordatorio?: string;

  @IsOptional()
  @IsNotEmpty()
  descripcion?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' })
  precioServicio?: number;

  @IsOptional()
  @IsDateString()
  fechaRecordatorio?: Date;

  @IsOptional()
  @IsEnum(TipoRecordatorio)
  tipoRecordatorio?: TipoRecordatorio;

  @IsOptional()
  @IsEnum(StatusRecordatorio)
  status?: string;

  @IsOptional()
  pinned?: boolean;
}
