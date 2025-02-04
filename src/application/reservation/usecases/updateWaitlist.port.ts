export interface UpdateWaitlistUsecaseInput {
  datetime: Date;
}

export interface UpdateWaitlistUsecase {
  execute(input: UpdateWaitlistUsecaseInput): void;
}
