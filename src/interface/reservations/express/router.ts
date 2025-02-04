import { Router } from 'express';

import { createReservationRules, updateReservationRules } from '../validators/express-validator';

import { cancelReservationController } from './cancel.controller';
import { createReservationController } from './create.controller';
import { getReservationController } from './get.controller';
import { updateReservationController } from './update.controller';

const router = Router();

router.get('/:id', getReservationController);
router.post('/', createReservationRules(), createReservationController);
router.put('/:id', updateReservationRules(), updateReservationController);
router.delete('/:id', cancelReservationController);

export { router };
