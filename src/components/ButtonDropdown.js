export default class ButtonDropdown {
  constructor(data, selectorBtnDropdown, {handleButtonClick}) {
    this._data = data
    this._selectorBtn = selectorBtnDropdown
    this._handleButtonClick = handleButtonClick
  }

  _getTemplate() {
    const buttonElement = document
    .querySelector(this._selectorBtn)
    .content
    .querySelector('.filters__dropdown-btn')
    .cloneNode(true)
  return buttonElement
  }

  getButton() {
    this._button = this._getTemplate()
    this._button.classList.add(`filters__dropdown-btn_type_${this._data._id}`)
    this._button.ariaLabel = `Показать ${this._data._id}`
    this._button.textContent = `${this._data.name}, ${this._data.about}`
    this._setEventListeners()
    return this._button
  }

  _setEventListeners() {
    this._button.addEventListener('click', () => this._handleButtonClick())
  }
}
