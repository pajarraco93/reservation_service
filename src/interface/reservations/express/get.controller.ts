import { Request, Response } from 'express';

export const getReservationController = async (_: Request, res: Response): Promise<void> => {
  res.status(201).send('Reservation');
};
