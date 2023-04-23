import { IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';
import {
  TipoCliente,
  Status,
  TipoCuenta,
  TipoDeServicio,
  MetodoAdquisicion,
} from '../entities/client.entity';

export class CreateClientDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsOptional()
  descripcion?: string;

  @IsNotEmpty()
  @IsEnum(MetodoAdquisicion)
  metodoAdquisicion: MetodoAdquisicion;

  @IsNotEmpty()
  @IsEmail()
  correoElectronico: string;

  @IsNotEmpty()
  ciudad: string;

  @IsNotEmpty()
  pais: string;

  @IsNotEmpty()
  empresa: string;

  @IsNotEmpty()
  sitioWeb: string;

  @IsNotEmpty()
  telefono: string;

  @IsOptional()
  avatar?: string;

  @IsNotEmpty()
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
