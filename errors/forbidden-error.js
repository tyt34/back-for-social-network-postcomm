class ForbiddenError extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'Нельзя удалить фильм, который создал другой пользователь!';
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
