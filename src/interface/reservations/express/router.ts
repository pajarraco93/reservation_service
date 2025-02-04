import { Router } from 'express';

import { cancelReservationController } from './cancel.controller';
import { createReservationController } from './create.controller';
import { getReservationController } from './get.controller';

const router = Router();

router.get('/:id', getReservationController);
router.post('/:id', createReservationController);
router.delete('/:id', cancelReservationController);

export { router };
