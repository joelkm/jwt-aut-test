// Custom error objects, more comfortable to handle authorization, validation...

class AppError extends Error {

  constructor(message, name) {
    super(message);
    this.name = name;
    this.apiError = true;
  }
}


class BadRequestError extends AppError {
  
  constructor(message) {
    super(message);
    this.name = "Bad Request";
  }
}


class ValidationError extends AppError {
  
  constructor(message) {
    super(message);
    this.name = "Validation";
  }
}


class NotFoundError extends AppError {
  
  constructor(message) {
    super(message);
    this.name = "Not Found";
  }
}


class AuthorizationError extends AppError {

  constructor(message) {
    super(message);
    this.name = "Authorization";
  }
}


class ForbiddenError extends AppError {
  
  constructor(message) {
    super(message);
    this.name = "Forbidden";
  }
}

module.exports = {
  AppError,
  BadRequestError,
  ValidationError,
  NotFoundError,
  AuthorizationError,
  ForbiddenError,
};
