import { Router } from 'express';

import { cancelReservationController } from './cancel.controller';
import { createReservationController } from './create.controller';
import { getReservationController } from './get.controller';
import { updateReservationController } from './update.controller';

const router = Router();

router.get('/:id', getReservationController);
router.post('/', createReservationController);
router.put('/:id', updateReservationController);
router.delete('/:id', cancelReservationController);

export { router };
