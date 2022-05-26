class ValidationError extends Error {
  constructor(mess) {
    super();
    this.statusCode = 400;
    if (mess === '') {
      this.message = 'Некорректные данные!';
    } else {
      this.message = mess;
    }
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
