import { Router } from 'express';

import { getAvailabiltyController } from './get.controller';

const router = Router();

router.get('/', getAvailabiltyController);

export { router };
