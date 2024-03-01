//объект конфигурации запроса
const config = {
    baseUrl: 'https://nomoreparties.co/v1/',
    cohortId: 'wff-cohort-8',
    headers: {
        authorization: 'e90a88de-4d84-48ee-a98b-66385728ff23',
        'Content-Type': 'application/json'
    }
};

//функция проверки ответа от сервера
function checkRequest (res) {
    return res.ok ? res.json() : Promise.reject();
}

//функция запроса данных о пользователе
function getUser () {
    return fetch(`${config.baseUrl}${config.cohortId}/users/me`, {
        headers: config.headers
    })
        .then(res => checkRequest(res));
}

//функция изменения данных пользователя
function patchUser (dataObj) {
    return fetch(`${config.baseUrl}${config.cohortId}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(dataObj)
    })
        .then(res => checkRequest(res));
}

//функция запроса карточек с сервера
function getCards () {
    return fetch(`${config.baseUrl}${config.cohortId}/cards`, {
        headers: config.headers
    })
        .then(res => checkRequest(res));
}

//функция запроса с добавлением новой карточки
function postCard (dataObj) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(dataObj)
    })
        .then(res => checkRequest(res));
}

//функция запроса с удалением карточки
function delCardRequest (cardId) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => checkRequest(res));
}

//функция запроса с лайком карточки
function putCardLike (cardId) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(res => checkRequest(res));
}

//функция запроса с удалением лайка карточки
function delCardLike (cardId) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => checkRequest(res));
}

//функция запроса с обновление аватара
function patchAvatar (dataObj) {
    return fetch(`${config.baseUrl}${config.cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(dataObj)
    })
        .then(res => checkRequest(res));
}

export {
    getUser,
    patchUser,
    getCards,
    postCard,
    delCardRequest,
    putCardLike,
    delCardLike,
    patchAvatar
};