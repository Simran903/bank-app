interface ApiResponseConstructorParams<T> {
  statusCode: number;
  data: T;
  message?: string;
}

class ApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;

  constructor({ statusCode, data, message = "Success" }: ApiResponseConstructorParams<T>) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
