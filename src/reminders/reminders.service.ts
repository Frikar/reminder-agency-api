import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { Client } from '../clients/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isNumber, isUUID } from 'class-validator';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private remindersRepository: Repository<Reminder>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(createReminderDto: CreateReminderDto) {
    try {
      const { clientId, ...recordatorioData } = createReminderDto;
      const cliente = await this.clientsRepository.findOneBy({ id: clientId });
      if (!cliente) {
        throw new NotFoundException(
          `Cliente con ID ${createReminderDto.clientId} no encontrado`,
        );
      }
      const reminder = this.remindersRepository.create({
        ...recordatorioData,
        cliente,
      });
      return await this.remindersRepository.save(reminder);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;

    const reminders = await this.remindersRepository
      .createQueryBuilder('recordatorio')
      .leftJoinAndSelect(
        'recordatorio.cliente',
        'cliente',
        'cliente.id = recordatorio.clienteId',
      )
      .select([
        'recordatorio',
        'cliente.id',
        'cliente.nombre',
        'cliente.apellido',
        'cliente.correoElectronico',
      ])
      .skip(offset)
      .take(limit)
      .getMany();

    return reminders;
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('ID no es un UUID válido');
    }
    const reminder = await this.remindersRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!reminder) {
      throw new NotFoundException(`Recordatorio con ID ${id} no encontrado.`);
    }

    return reminder;
  }

  async findByClient(clientId: number) {
    let reminder: Reminder[];
    if (isNumber(clientId)) {
      reminder = await this.remindersRepository
        .createQueryBuilder('recordatorio')
        .where('recordatorio.clienteId = :clientId', { clientId })
        .getMany();
    } else {
      throw new InternalServerErrorException('ID no es un número');
    }
    if (!reminder) {
      throw new InternalServerErrorException(
        `No se encontraron recordatorios para el cliente con ID ${clientId}.`,
      );
    }

    return reminder;
  }

  async pinReminder(id: string) {
    const reminder = await this.remindersRepository.findOne({
      where: { id },
    });

    if (!reminder) {
      throw new NotFoundException(`Recordatorio con ID ${id} no encontrado.`);
    }

    reminder.pinned = !reminder.pinned;
    return await this.remindersRepository.save(reminder);
  }

  async updateStatus(id: string, updateReminderDto: UpdateReminderDto) {
    try {
      const reminder = await this.remindersRepository.findOne({
        where: { id },
      });

      if (!reminder) {
        throw new NotFoundException(`Recordatorio con ID ${id} no encontrado.`);
      }

      reminder.status = updateReminderDto.status;
      return await this.remindersRepository.save(reminder);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async markAsPending(id: string) {}

  async update(id: string, updateReminderDto: UpdateReminderDto) {
    try {
      if (!isUUID(id)) {
        throw new BadRequestException('ID no es un UUID válido');
      }

      const reminder = await this.remindersRepository.findOne({
        where: { id },
      });

      if (!reminder) {
        throw new NotFoundException(`Recordatorio con ID ${id} no encontrado.`);
      }

      Object.assign(reminder, updateReminderDto);
      await this.remindersRepository.save(reminder);

      return this.remindersRepository.findOne({
        where: { id },
        relations: ['cliente'],
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.remindersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Recordatorio con ${id} no encontrado.`);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new InternalServerErrorException(error.detail);

    if (error.code === '23502')
      throw new BadRequestException('Campo requerido no enviado o inválido');

    if (error.code === '22P02') throw new BadRequestException('Valor inválido');

    throw new InternalServerErrorException(error);
  }
}
