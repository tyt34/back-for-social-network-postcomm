class WrongKeys extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Неправильные keys в body запроса!';
    this.name = 'WrongKeys';
  }
}

module.exports = WrongKeys;
