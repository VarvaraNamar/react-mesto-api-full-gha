class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  async getUserInfo() {
    const res = await fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    });
    return this._checkResponse(res);
  }//загрузка инфы о пользователе

  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }//загрузка данных карточек

  async setUserInfoApi(userData) {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
    return this._checkResponse(res);
  }//редактирование профиля

  async setUserAvatarApi(userData) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    });
    return this._checkResponse(res);
  }//новый аватар

  async addNewCard(newData, isUser) {
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        link: newData.link,
        isUser: isUser,
      })
    });
    return this._checkResponse(res);
  }//добавление новой карточки

  async setLikeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }//лайк карточки

  async removeLikeCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }//снятие лайка

  changeLikeCardStatus(cardId, isLiked) {
		return isLiked ? this.setLikeCard(cardId) : this.removeLikeCard(cardId)
	};

  async deleteCard(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }//удаление карточки

  getStartData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }//стартовые значения инфо и карточек
}

const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-65",
	headers: {
		authorization: "7c8da599-6aba-41f7-81de-e4912bb02751",
		'Content-Type': 'application/json'
	}
});

export default api;