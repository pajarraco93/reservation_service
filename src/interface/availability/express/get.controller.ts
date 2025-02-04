import { container } from '@infra/shared/dependecyContainer';
import { ReservationServiceError } from '@shared/errors';
import { Request, Response } from 'express';

export const getAvailabiltyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { datetime, partySize } = req.query;

    const slots = container.usecases.getAvailability.execute({
      datetime: new Date(String(datetime!)),
      partySize: Number(partySize)
    });

    res.status(200).send(slots.map((slot) => slot.toLocaleString()));
  } catch (error) {
    if (error instanceof ReservationServiceError) {
      res.status(error.statusCode).json({ error: error.message });
    }
  }
};
