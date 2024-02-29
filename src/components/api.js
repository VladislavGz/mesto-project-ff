//объект конфигурации запроса
const config = {
    baseUrl: 'https://nomoreparties.co/v1/',
    cohortId: 'wff-cohort-8',
    headers: {
        authorization: 'e90a88de-4d84-48ee-a98b-66385728ff23',
        'Content-Type': 'application/json'
    }
};

//функция запроса данных о пользователе
function getUser () {
    return fetch(`${config.baseUrl}${config.cohortId}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//функция изменения данных пользователя
function patchUser (dataObj) {
    return fetch(`${config.baseUrl}${config.cohortId}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(dataObj)
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//функция запроса карточек с сервера
function getCards () {
    return fetch(`${config.baseUrl}${config.cohortId}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//функция запроса с добавлением новой карточки
function postCard (dataObj) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(dataObj)
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//функция запроса с удалением карточки
function delCardRequest (cardId) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//функция запроса с лайком карточки
function putCardLike (cardId) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

//функция запроса с удалением лайка карточки
function delCardLike (cardId) {
    return fetch(`${config.baseUrl}${config.cohortId}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export {
    getUser,
    patchUser,
    getCards,
    postCard,
    delCardRequest,
    putCardLike,
    delCardLike
};