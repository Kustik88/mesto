export default class Sorter {
  constructor(filteredElement) {
    this._filteredElement = filteredElement
  }

  filterOut(data) {
    const sortList =data.sort((current, next) => {
      return current[this._filteredElement].length - next[this._filteredElement].length
    })
    console.log(sortList)
    return sortList
  }


}
