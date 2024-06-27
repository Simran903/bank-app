interface ApiErrorConstructorParams {
  statusCode: number;
  message?: string;
  errors?: any[];
  stack?: string;
}

class ApiError extends Error {
  public statusCode: number;
  public data: null | any;
  public message: string;
  public success: boolean;
  public errors: any[];

  constructor({
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  }: ApiErrorConstructorParams) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
