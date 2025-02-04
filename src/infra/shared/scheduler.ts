import { Reservation } from '@domain/reservation/model';

import { container } from './dependecyContainer';

const NOTIFICATION_ALERT = 60 * 60 * 1000;
const SCHEDULER_CHECK_PERIOD = 60 * 1000;

export const scheduleNotifications = () => {
  setInterval(() => {
    const now = new Date();
    const alertTime = new Date(now.getTime() + NOTIFICATION_ALERT);
    const upcomingReservations = container.repositories.reservation.getReservedByDate(alertTime);

    upcomingReservations.forEach((reservation: Reservation) =>
      console.log(
        `Hey ${reservation.customerName} you have a reservation at ${reservation.startsAt.toLocaleString()}`
      )
    );
  }, SCHEDULER_CHECK_PERIOD);
};
