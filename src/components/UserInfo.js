export default class UserInfo {
  constructor(selectorNameProfile, selectorJobProfile) {
    this._nameProfile = document.querySelector(selectorNameProfile)
    this._jobProfile = document.querySelector(selectorJobProfile)
  }

  getUserInfo() {
    this._dataProfile = {}
    this._dataProfile.owner = this._nameProfile.textContent
    this._dataProfile.job = this._jobProfile.textContent
    return this._dataProfile
  }

  setUserInfo(data) {
    this._nameProfile.textContent = data.owner
    this._jobProfile.textContent = data.job
  }
}
