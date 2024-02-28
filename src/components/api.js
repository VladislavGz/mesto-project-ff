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

export {
    getUser
};