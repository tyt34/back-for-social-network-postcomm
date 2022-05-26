class CastError extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Невалидный id!!';
    this.name = 'CastError';
  }
}

module.exports = CastError;
