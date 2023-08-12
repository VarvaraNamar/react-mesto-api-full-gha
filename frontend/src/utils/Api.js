class Api {
  constructor(options) {
    this._url = options.url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  async getUserInfo() {
    const res = await fetch(this._url + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(res)
  } //загрузка инфы о пользователе

  async getCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(res)
  } //загрузка данных карточек

  async setUserInfoApi(userData) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
    return this._checkResponse(res)
  } //редактирование профиля

  async setUserAvatarApi(userData) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    })
    return this._checkResponse(res)
  } //новый аватар

  async createCard(newData, isUser) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: newData.name,
        link: newData.link,
        isUser: isUser,
      }),
    })
    return this._checkResponse(res)
  } //добавление новой карточки

  async setLikeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(res)
  } //лайк карточки

  async dislikeCardCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(res)
  } //снятие лайка

  /*changeLikeCardStatus(cardId, isLiked) {
		return isLiked ? this.setLikeCard(cardId) : this.dislikeCardCard(cardId)
	};*/

  async deleteCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(res)
  } //удаление карточки

  getStartData() {
    return Promise.all([this.getUserInfo(), this.getCards()])
  } //стартовые значения инфо и карточек
}

const api = new Api({
  url: "https://api.varvara.nomoreparties.co",
  // url: "http://localhost:3000",
})

export default api
