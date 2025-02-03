import { Router } from 'express';

import { getReservationController } from './get.controller';
import { createReservationController } from './create.controller';

const router = Router();

router.get('/:id', getReservationController);
router.post('/:id', createReservationController);

export { router };
