import { router as availabilityRouter } from '@interface/availability/express/router';
import { router as reservationRouter } from '@interface/reservations/express/router';
import { APP_NAME } from '@shared/env';
import express from 'express';
import type { Server } from 'http';

const createServer = (port: string | number) => {
  const application = express();
  let server: Server | null = null;

  application.use(express.json());

  application.use('/reservation', reservationRouter);
  application.use('/availability', availabilityRouter);

  const close = (): Promise<void> => {
    return new Promise((resolve) => {
      server?.close(() => {
        console.info('HTTP server closed');
        resolve();
      });
    });
  };

  const run = () => {
    server = application.listen(port, () => {
      console.info(`${APP_NAME} application listening on ${port}`);
      application.emit('listened');
    });

    process.on('SIGTERM', (code) => {
      console.info('SIGTERM signal received: closing HTTP server, ', code);
      close();
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught error received: ', error);
    });

    return server;
  };

  return { application, run, close };
};

export default createServer;
