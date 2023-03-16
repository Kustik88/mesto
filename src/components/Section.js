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

  clearBlock() {
    this._container.innerHTML=''
  }

  renderItems(items, currentUserId) {
    items.forEach(item => this._renderer(item, currentUserId))
  }
}
