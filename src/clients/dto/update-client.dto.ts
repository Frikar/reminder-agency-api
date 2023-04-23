import { IsOptional, IsEmail, IsEnum } from 'class-validator';
import {
  TipoCliente,
  Status,
  TipoCuenta,
  TipoDeServicio,
  MetodoAdquisicion,
} from '../entities/client.entity';

export class UpdateClientDto {
  @IsOptional()
  nombre?: string;

  @IsOptional()
  apellido?: string;

  @IsOptional()
  descripcion?: string;

  @IsOptional()
  @IsEnum(MetodoAdquisicion)
  metodoAdquisicion?: MetodoAdquisicion;

  @IsOptional()
  @IsEmail()
  correoElectronico?: string;

  @IsOptional()
  ciudad?: string;

  @IsOptional()
  pais?: string;

  @IsOptional()
  empresa?: string;

  @IsOptional()
  sitioWeb?: string;

  @IsOptional()
  telefono?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsEnum(TipoDeServicio)
  tipoServicio?: TipoDeServicio;

  @IsOptional()
  @IsEnum(TipoCliente)
  tipoCliente?: TipoCliente;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEnum(TipoCuenta)
  tipoCuenta?: TipoCuenta;
}
