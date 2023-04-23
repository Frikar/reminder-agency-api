import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isNumber } from 'class-validator';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const client = this.clientsRepository.create(createClientDto);
      const clientSaved = await this.clientsRepository.save(client);
      clientSaved.avatar = `https://www.gravatar.com/avatar/${clientSaved.id}?s=200&d=identicon`;
      return await this.clientsRepository.save(clientSaved);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const clients = await this.clientsRepository.find({
      take: limit,
      skip: offset,
      relations: {
        recordatorios: true,
      },
    });
    return clients;
  }

  async findOne(id: number) {
    let client: Client;
    if (isNumber(id)) {
      client = await this.clientsRepository.findOne({
        where: { id: id },
      });
    } else {
      throw new InternalServerErrorException('ID no es un número');
    }
    if (!client) {
      throw new InternalServerErrorException('Cliente no encontrado');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const updatedClient = await this.clientsRepository.preload({
        id,
        ...updateClientDto,
      });

      if (!updatedClient) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }

      return await this.clientsRepository.save(updatedClient);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const result = await this.clientsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
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
