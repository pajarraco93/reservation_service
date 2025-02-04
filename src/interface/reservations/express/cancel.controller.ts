import { container } from '@infra/shared/dependecyContainer';
import { ReservationServiceError } from '@shared/errors';
import { Request, Response } from 'express';

export const cancelReservationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reservation = container.usecases.cancelReservation.execute({ reservationId: id });

    container.usecases.updateWaitList.execute({ datetime: reservation.startsAt });

    res.status(204).send(reservation);
  } catch (error) {
    if (error instanceof ReservationServiceError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
};
