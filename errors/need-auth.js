class NeedAuth extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Необходима авторизация!';
    this.name = 'NeedAuth';
  }
}

module.exports = NeedAuth;
