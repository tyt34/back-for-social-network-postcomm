class NotNewInfo extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Вы не внесли никакой новой информации!';
    this.name = 'NotNewInfo';
    this.ok = 'bad'
  }
}

module.exports = NotNewInfo;
