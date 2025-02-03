import { CreateReservationUsecaseInput } from '@application/reservation/usecases/create.port';
import { container } from '@infra/shared/dependecyContainer';
import { Request, Response } from 'express';

export const createReservationController = async (req: Request, res: Response): Promise<void> => {
  const inputParams = req.body as CreateReservationUsecaseInput;
  const reservation = await container.usecases.createReservation.execute(inputParams);

  console.log("Reservation with values: ", reservation);

  res.status(201).send('Reservation created');
};
