import { UpdateReservationUsecaseInput } from '@application/reservation/usecases/update.port';
import { container } from '@infra/shared/dependecyContainer';
import { ReservationServiceError } from '@shared/errors';
import { Request, Response } from 'express';

export const updateReservationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedReservation = {
      ...(req.body as UpdateReservationUsecaseInput),
      id
    };

    const reservation = container.usecases.updateReservation.execute({ updatedReservation });

    res.status(200).send(reservation);
  } catch (error) {
    if (error instanceof ReservationServiceError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
};
