import { data } from "autoprefixer"

export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer
    this._container = document.querySelector(selectorContainer)
    this._isNewContainer = true
  }

  addItem(element, isPrepend = false) {
    isPrepend
      ? this._container.prepend(element)
      : this._container.append(element)
  }

  clearBlock() {
    this._container.innerHTML = ''
  }

  changeContainer(selectorBlock) {
    if (this._isNewContainer) {
      this._container = this._container.querySelector(`.${selectorBlock}`)
      this._isNewContainer = !this._isNewContainer
    }
  }

  getUniqueOwnersCard(dataCards) {
    const listUniqueOwnersString = []
    const listUniqueOwners = []
    dataCards.forEach(elem => {
      if(!listUniqueOwnersString.includes(JSON.stringify(elem.owner))){
      listUniqueOwnersString.push(JSON.stringify(elem.owner))
      listUniqueOwners.push(elem.owner)
      }
    })
   return listUniqueOwners
  }


  renderItems(items, currentUserId) {
    items.forEach(item => this._renderer(item, currentUserId))
  }
}
