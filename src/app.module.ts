import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemindersModule } from './reminders/reminders.module';
import { CommonModule } from './common/common.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AcmeChallengeController } from './acme-challenge/acme-challenge.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
      },
      {
        rootPath: join(__dirname, '..', 'acme-challenge'),
        serveRoot: '/.well-known/acme-challenge',
      },
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClientsModule,
    RemindersModule,
    CommonModule,
  ],
  controllers: [AppController, AcmeChallengeController],
  providers: [AppService],
})
export class AppModule {}
