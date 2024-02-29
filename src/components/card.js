//Функция создания карточки
function createCard (cardTemplate, dataCard, delCallback, likeCard, openImage, networkQueryFuncs) {
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
            networkQueryFuncs.delCard(dataCard.cardId)
                .then(() => {
                    delCallback(card);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    } else {
        deleteBtn.disabled = true;
        deleteBtn.classList.add('card__delete-button_disabled');
    }

    likeBtn.addEventListener('click', () => {
        if (likeBtn.classList.contains('card__like-button_is-active')) {
            networkQueryFuncs.delLike(dataCard.cardId)
                .then(res => {
                    likeCounter.textContent = res.likes.length;
                    likeCard(likeBtn);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            networkQueryFuncs.putLike(dataCard.cardId)
                .then(res => {
                    likeCounter.textContent = res.likes.length;
                    likeCard(likeBtn);
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
function likeCard (likeBtn) {
    likeBtn.classList.toggle('card__like-button_is-active');
}

export {
    createCard,
    deleteCard,
    likeCard
};