class WBAPIError extends Error {
  constructor(userId, status, message) {
    super(message);
    this.userId = userId;
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }
}

class FormDataError extends Error {
  constructor(message, invalidField) {
    super(message);
    this.status = 400;
    this.message = message;
    this.invalidField = invalidField;
    this.name = this.constructor.name;
  }
}

export { WBAPIError, FormDataError };
