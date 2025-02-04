export class ReservationServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ReservationServiceError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends ReservationServiceError {
  constructor(message = 'Invalid data provided') {
    super(message, 400);
  }
}
