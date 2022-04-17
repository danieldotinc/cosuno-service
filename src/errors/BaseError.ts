export interface ErrorStruct {
  errorCode: number;
  message: string;
  field?: string;
}

export abstract class BaseError extends Error {
  abstract errorCode: number;
  constructor(public errorMessage?: string) {
    super(errorMessage ? errorMessage : 'BaseError');
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): ErrorStruct[];
}
