import { CreateReservationUsecaseInput } from '@application/reservation/usecases/create.port';
import { container } from '@infra/shared/dependecyContainer';
import { ReservationServiceError } from '@shared/errors';
import { Request, Response } from 'express';

export const createReservationController = async (req: Request, res: Response): Promise<void> => {
  try {
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
