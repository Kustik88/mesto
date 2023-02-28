import PopupWithForm from "./PopupWithForm"

export default class UserInfo {
  consnructor(nameProfileSelector, jobProfileSelector) {
    this._nameProfile = document.querySelector(nameProfileSelector)
    this._jobProfile = document.querySelector(jobProfileSelector)
  }

  getUserInfo() {
    this._dataProfile = {}
    this._dataProfile.name = this._nameProfile.textContent
    this._dataProfile.job = this._jobProfile.textContent
    return this._dataProfile
  }

  setUserInfo(data) {
    this._nameProfile.textContent = data.name
    this._jobProfile.textContent = data.job
  }
}
