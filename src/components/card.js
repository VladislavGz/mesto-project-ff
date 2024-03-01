//Функция создания карточки
function createCard (cardTemplate, dataCard, handleDeleteCard, handleLikeCard, openImage) {
    const card = cardTemplate.cloneNode(true);

    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const deleteBtn = card.querySelector('.card__delete-button');
    const likeBtn = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');

    title.textContent = dataCard.name;
    likeCounter.textContent = dataCard.likes;

    img.setAttribute('src', dataCard.link);
    img.setAttribute('alt', `Фото: ${dataCard.name}`);

    if (dataCard.isLike) {
        likeBtn.classList.add('card__like-button_is-active');
    }

    if (dataCard.isOwner) {
        deleteBtn.addEventListener('click', () => {
            handleDeleteCard(card, dataCard.cardId);
        });
    } else {
        deleteBtn.disabled = true;
        deleteBtn.classList.add('card__delete-button_disabled');
    }

    likeBtn.addEventListener('click', () => {
        handleLikeCard(
            checkLike(likeBtn),
            dataCard.cardId,
            {
                likeBtn,
                likeCounter
            });
    });

    img.addEventListener('click', () => {
        openImage({
            src: dataCard.link,
            alt: `Фото: ${dataCard.name}`,
            txt: dataCard.name
        });
    });

    return card;
};

//Функция удаления карточки
function deleteCard (card) {
    card.remove();
}

//функция лайка карточки
function changeLike (elems, status, counter) {
    if (status) elems.likeBtn.classList.add('card__like-button_is-active');
    else elems.likeBtn.classList.remove('card__like-button_is-active');

    elems.likeCounter.textContent = counter;
}

//функция проверки наличия лайка на существующей карточке от пользователя при загрузке
function checkLikeLoad (userId, card) {
    for (let i = 0; i < card.likes.length; i++) {
        if (card.likes[i]._id === userId) {
            return true;
        }
    }
    return false;
}

//функция проверки наличия лайка после загрузки и присвоения соответствующих классов
function checkLike (likeButton) {
    return likeButton.classList.contains('card__like-button_is-active');
}

export {
    createCard,
    deleteCard,
    changeLike,
    checkLikeLoad
};