import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './entities/reminder.entity';
import { ClientsModule } from '../clients/clients.module';

@Module({
  controllers: [RemindersController],
  providers: [RemindersService],
  imports: [TypeOrmModule.forFeature([Reminder]), ClientsModule],
})
export class RemindersModule {}
