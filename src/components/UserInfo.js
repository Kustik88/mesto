export default class UserInfo {
  constructor(selectorNameProfile, selectorJobProfile, selectorAvatarProfile) {
    this._nameProfile = document.querySelector(selectorNameProfile)
    this._jobProfile = document.querySelector(selectorJobProfile)
    this._avatarProfile = document.querySelector(selectorAvatarProfile)
  }

  getUserInfo() {
    this._dataProfile = {}
    this._dataProfile.owner = this._nameProfile.textContent
    this._dataProfile.job = this._jobProfile.textContent
    return this._dataProfile
  }

  setUserInfo(data) {
    this._nameProfile.textContent = data.name
    this._jobProfile.textContent = data.about
    this._avatarProfile.alt = data.name
  }

  setUserAvatar(data) {
    this._avatarProfile.src = data.avatar
  }
}
