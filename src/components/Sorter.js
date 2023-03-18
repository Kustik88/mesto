export default class Sorter {
  constructor(filteredElement) {
    this._filteredElement = filteredElement
  }

  sorting(data, ascending = false) {
    data.sort((current, next) => {
      if (ascending) {
        return current[this._filteredElement].length - next[this._filteredElement].length
      } else {
        return next[this._filteredElement].length - current[this._filteredElement].length
      }
    })
    return data
  }


}
