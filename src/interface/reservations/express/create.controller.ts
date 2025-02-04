import { CreateReservationUsecaseInput } from '@application/reservation/usecases/create.port';
import { container } from '@infra/shared/dependecyContainer';
import { ReservationServiceError } from '@shared/errors';
import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { validationResult } = require('express-validator');

export const createReservationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const inputParams = req.body as CreateReservationUsecaseInput;

    if (typeof inputParams.datetime === 'string') {
      inputParams.datetime = new Date(inputParams.datetime);
    }

    const reservation = container.usecases.createReservation.execute(inputParams);

    res.status(201).json(reservation);
  } catch (error) {
    if (error instanceof ReservationServiceError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
};
