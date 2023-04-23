import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { promises as fs } from 'fs';

@Controller('.well-known/acme-challenge')
export class AcmeChallengeController {
  @Get(':token')
  async getChallenge(@Param('token') token: string, @Res() res: Response) {
    try {
      const filePath = join('/var/www/html/.well-known/acme-challenge', token);
      const fileContent = await fs.readFile(filePath, 'utf8');
      res.send(fileContent);
    } catch (err) {
      res.status(404).send('Not found');
    }
  }
}
