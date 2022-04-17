import { BaseError, ErrorStruct } from './BaseError';

export default class InvalidInputError extends BaseError {
  errorCode = 400;
  constructor(public errorMessage?: string, public field?: string) {
    super(errorMessage ? errorMessage : 'WrongInput');
    Object.setPrototypeOf(this, InvalidInputError.prototype);
  }

  serializeErrors(): ErrorStruct[] {
    return [{ errorCode: this.errorCode, message: this.errorMessage || 'WrongInput', field: this.field }];
  }
}
