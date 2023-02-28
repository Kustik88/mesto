import {imagePopUp, captionPopUp } from '../pages/index'
import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  consnructor(data, popupSelector) {
    super(popupSelector)
    this._link = data.link
    this._name = data.name
  }

  open () {
    imagePopUp.src = this._link
    imagePopUp.alt = this._name
    captionPopUp.textContent = this._name
    super.open()
  }
}
