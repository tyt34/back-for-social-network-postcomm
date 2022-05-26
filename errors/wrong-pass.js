class WrongPass extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Неправильные почта или пароль!';
    this.name = 'WrongPass';
  }
}

module.exports = WrongPass;
