//Функция создания карточки
function createCard (cardTemplate, dataCard, delCallback, likeCard, openImage) {
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

    if (dataCard.isOwner) {
        deleteBtn.addEventListener('click', delCallback);
    } else {
        deleteBtn.disabled = true;
        deleteBtn.classList.add('card__delete-button_disabled');
    }
    
    likeBtn.addEventListener('click', likeCard);
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
function deleteCard (evt) {
    evt.target.closest('.card').remove();
}

//функция лайка карточки
function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export {
    createCard,
    deleteCard,
    likeCard
};