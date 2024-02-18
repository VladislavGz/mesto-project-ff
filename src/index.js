import initialCards from "./scripts/cards";


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (dataCard, delCallback) {
    const card = cardTemplate.cloneNode(true);

    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const deleteBtn = card.querySelector('.card__delete-button');
    
    title.textContent = dataCard.name;

    img.setAttribute('src', dataCard.link);
    img.setAttribute('alt', `Фото: ${dataCard.name}`);

    deleteBtn.addEventListener('click', delCallback);

    return card;
};

// @todo: Функция удаления карточки
function deleteCard (evt) {
    evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(elem => {
    cardList.append(createCard(elem, deleteCard));
});