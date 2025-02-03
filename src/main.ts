// eslint-disable-next-line simple-import-sort/imports
import 'module-alias/register';

import createServer from '@interface/shared/express/server';
import { PORT } from '@shared/env';

import 'module-alias/register';

export const startApplication = async () => {
  createServer(PORT).run();
};

startApplication();
