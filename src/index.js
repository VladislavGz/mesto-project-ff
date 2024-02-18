import './pages/index.css';
import initialCards from "./scripts/cards";


//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

//DOM узлы
const cardList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

//Функция создания карточки
function createCard (dataCard, delCallback) {
    const card = cardTemplate.cloneNode(true);

    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const deleteBtn = card.querySelector('.card__delete-button');

    title.textContent = dataCard.name;

    img.setAttribute('src', dataCard.link);
    img.setAttribute('alt', `Фото: ${dataCard.name}`);

    deleteBtn.addEventListener('click', delCallback);
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

//функция открытия попапа
function openPopup (popup) {
    popup.classList.add('popup_is-opened');
}

//функция открытия изображения
function openImage (imgData) {
    const img = popupImage.querySelector('.popup__image');
    const txt = popupImage.querySelector('.popup__caption');
    img.setAttribute('src', imgData.src);
    img.setAttribute('alt', imgData.alt);
    txt.textContent = imgData.txt;
    openPopup(popupImage);
}

//открытие окна редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(popupEdit);
});

//открытие окна добавления новой карточки
addCardButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});




//Вывести карточки на страницу
initialCards.forEach(elem => {
    cardList.append(createCard(elem, deleteCard));
});