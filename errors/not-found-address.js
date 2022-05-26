class NotFoundAddress extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Вы пытаетесь обратится по несуществующему адресу!';
    this.name = 'NotFoundAddress';
  }
}

module.exports = NotFoundAddress;
