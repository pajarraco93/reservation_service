import { CreateReservationUsecaseInput } from '@application/reservation/usecases/create.port';
import { container } from '@infra/shared/dependecyContainer';
import { Request, Response } from 'express';

export const createReservationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const inputParams = req.body as CreateReservationUsecaseInput;

    if (typeof inputParams.datetime === 'string') {
      inputParams.datetime = new Date(inputParams.datetime);
    }

    const reservation = await container.usecases.createReservation.execute(inputParams);

    res.status(201).json({ reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
};
