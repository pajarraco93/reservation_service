import { Router } from 'express';

import { getReservationController } from './get.controller';

const router = Router();

router.get('/:id', getReservationController);

export { router };
