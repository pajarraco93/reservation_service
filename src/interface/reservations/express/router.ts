import { Router } from 'express';

import { createReservationController } from './create.controller';
import { getReservationController } from './get.controller';

const router = Router();

router.get('/:id', getReservationController);
router.post('/:id', createReservationController);

export { router };
