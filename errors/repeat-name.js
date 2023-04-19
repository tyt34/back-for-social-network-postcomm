class RepeatName extends Error {
  constructor() {
    super()
    this.statusCode = 409
    this.message = 'Данное имя уже зарегистрировано!'
    this.name = 'RepeatName'
    this.error = true
    this.ok = 'bad'
  }
}

module.exports = RepeatName
