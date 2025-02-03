import AppDataSource from './dataSource';

export const databaseConnectionInitializer = async (): Promise<void> => {
  AppDataSource.initialize()
    .then(() => {
      process.stdout.write('\n');
      console.info('Database connection success');
    })
    .catch((error: any) => {
      if (!AppDataSource.isInitialized) {
        console.error('Database is not initialized.', error);
        setTimeout(() => {
          console.info('Retrying connection to db');
          databaseConnectionInitializer();
        }, 5000);
      }
    });
};
