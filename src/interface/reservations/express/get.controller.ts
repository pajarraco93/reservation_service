import { container } from '@infra/shared/dependecyContainer';
import { ReservationServiceError } from '@shared/errors';
import { Request, Response } from 'express';

export const getReservationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reservation = container.usecases.getReservation.execute({ reservationId: id });

    res.status(200).send(reservation);
  } catch (error) {
    if (error instanceof ReservationServiceError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
};
