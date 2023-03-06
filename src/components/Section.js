export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._renderedItems = items
    this._renderer = renderer
    this._container = document.querySelector(selectorContainer)
  }

  addItem(element, isPrepend = false) {
    isPrepend
      ? this._container.prepend(element)
      : this._container.append(element)
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }
}
