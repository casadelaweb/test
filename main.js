class Timer {
  static optionsDefault = {
    duration: 60,
    step: 1000,
    selectors: {
      timer: '.timer',
      message: '.timer-message',
      button: '.timer-button',
    }
  }

  constructor(optionsCustom) {
    this.timer = false
    this.isStopped = true
    this.options = {
      ...Timer.optionsDefault,
      ...optionsCustom
    }
    this.selectors = {
      ...Timer.optionsDefault.selectors,
      ...optionsCustom.selectors,
    }
    this.remainingTime = this.options.duration
    this.elements = this.updateElements()
  }

  updateElements() {
    const { body } = document

    const timerElement = body.querySelector(this.selectors.timer)
    const timerMessage = body.querySelector(this.selectors.message)

    return {
      timerElement, timerMessage
    }
  }

  declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
  }

  renderTime() {
    this.remainingTime -= 1
    this.elements.timerMessage.textContent = 'Повторная отправка через ' + this.remainingTime + ' ' + this.declOfNum(this.remainingTime, ['секунду', 'секунды', 'секунд'])

    if (this.remainingTime === 0) this.setDefaultState()
  }

  init() {
    this.elements = this.updateElements()
    this.elements.timerMessage.textContent = ''
    this.setDefaultState()

    document.addEventListener('click', (event) => {
      const { target } = event
      if (target.closest(this.selectors.button)) this.startTimer()
    })
  }

  setDefaultState() {
    this.isStopped = true
    this.remainingTime = this.options.duration
    this.elements.timerMessage.textContent = 'Можно отправить повторно'
    clearInterval(this.timer)
  }

  startTimer() {
    if (this.isStopped) {
      this.isStopped = false
      this.elements.timerMessage.textContent = `До повторной отправки ${ this.options.duration } секунд`
      this.timer = setInterval(this.renderTime.bind(this), this.options.step)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttonTimer = new Timer({
    duration: 10,
  })
  buttonTimer.init()
})


