class NotFoundError extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Указанные данные отсутствуют!';
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
