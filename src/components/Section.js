export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer
    this._container = document.querySelector(selectorContainer)
  }

  addItem(element, isPrepend = false) {
    isPrepend
      ? this._container.prepend(element)
      : this._container.append(element)
  }

  renderItems(cardList, currentUserId) {
    cardList.forEach(item => this._renderer(item, currentUserId))
  }
}
