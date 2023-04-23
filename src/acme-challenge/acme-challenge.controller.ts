import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('.well-known/acme-challenge')
export class AcmeChallengeController {
  @Get(':token')
  @Get(':challenge')
  async serveChallenge(
    @Param('challenge') challenge: string,
    @Res() res: Response,
  ) {
    const challengePath = join(
      __dirname,
      '..',
      'public',
      '.well-known',
      'acme-challenge',
      challenge,
    );

    try {
      createReadStream(challengePath).pipe(res);
    } catch (error) {
      res.status(404).send('Not found');
    }
  }
}
