export interface GetAvailabilityUsecaseInput {
  datetime: Date;
  partySize: number;
}

export interface GetAvailabilityUsecase {
  execute(input: GetAvailabilityUsecaseInput): Date[];
}
