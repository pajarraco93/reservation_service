export interface CancelReservationUsecaseInput {
  reservationId: string;
}

export interface CancelReservationUsecase {
  execute(input: CancelReservationUsecaseInput): boolean;
}
