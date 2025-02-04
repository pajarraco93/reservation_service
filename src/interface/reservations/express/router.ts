import { Router } from 'express';

import { createReservationController } from './create.controller';
import { getReservationController } from './get.controller';
import { cancelReservationController } from './cancel.controller';

const router = Router();

router.get('/:id', getReservationController);
router.post('/:id', createReservationController);
router.delete('/:id', cancelReservationController);

export { router };
