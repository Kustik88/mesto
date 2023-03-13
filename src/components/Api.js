export default class Api {
  constructor(basePath, token) {
    this._basePath = basePath
    this._token = token
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: this._token
    }
  }

  _getJson(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(res => this._getJson(res))
  }

  changeUserInfo(data){
    return fetch(`${this._basePath}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.owner,
        about: data.job
      })
    })
    .then(res => this._getJson(res))
  }

  getCards() {
    return fetch(`${this._basePath}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(res => this._getJson(res))
  }

  addCard(dataCard) {
    return fetch(`${this._basePath}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    })
    .then(res => this._getJson(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._basePath}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
  }

  likeCard(dataCardId){
    return fetch(`${this._basePath}/cards/${dataCardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then(res => this._getJson(res))
  }

  unlikeCard(dataCardId) {
    return fetch(`${this._basePath}/cards/${dataCardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(res => this._getJson(res))
  }

  getCardsInfo() {
    return fetch(`${this._basePath}/cards/`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
    .then(res => this._getJson(res))
  }

  }

  // countLikes(id) {
  //   return fetch(`${this._basePath}/cards/${id}/likes`, {
  //     method: 'GET',
  //     headers: this._getHeaders()
  //   })
  // }


