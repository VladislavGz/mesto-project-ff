import './pages/index.css';
import initialCards from "./scripts/cards";

let activePopup = null;

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

//DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editForm = popupEdit.querySelector('.popup__form');
const editNameInput = editForm.elements['name'];
const editJobInput = editForm.elements['description'];

const addCardForm = popupAddCard.querySelector('.popup__form');
const addCardNameInput = addCardForm.elements['place-name'];
const addCardLinkInput = addCardForm.elements['link'];

//функция обработки события клика по попапу
function popupHandler (evt) {
    const popup = evt.target.closest('.popup');
    const closeBtn = popup.querySelector('.popup__close');

    if (evt.target === popup || evt.target === closeBtn) {
        closePopup(popup);
    }
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

//функция открытия окна редактирования
function openEdit () {
    editNameInput.value = profileTitle.textContent;
    editJobInput.value = profileDescription.textContent;

    openPopup(popupEdit);
}

//обработчик отправки формы (окно редактирования)
function handleFormSubmitEdit (evt) {
    evt.preventDefault();

    profileTitle.textContent = editNameInput.value;
    profileDescription.textContent = editJobInput.value;
}

//функция открытия попапа добавления карточки
function openNewCard () {
    addCardNameInput.value = '';
    addCardLinkInput.value = '';

    openPopup(popupAddCard);
}

//обработчик отправки формы (новая карточка)
function handleFormSubmitAddCard (evt) {
    evt.preventDefault();

    const newCard = {
        name: addCardNameInput.value,
        link: addCardLinkInput.value
    };

    cardList.prepend(createCard(newCard, deleteCard));
    closePopup(activePopup);
}

//--------------------------------------------------------------------
//анимирование попапов
popupEdit.classList.add('popup_is-animated');
popupAddCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

//открытие окна редактирования профиля
editButton.addEventListener('click', openEdit);

//отправка формы (окно редактирования)
editForm.addEventListener('submit', handleFormSubmitEdit);

//открытие окна добавления новой карточки
addCardButton.addEventListener('click', openNewCard);

//отправка формы (новая карточка)
addCardForm.addEventListener('submit', handleFormSubmitAddCard);

//обработка клавиатуры
document.addEventListener('keydown', evt => {
    //закрытие попапа на клавишу Esc
    if (activePopup && evt.key === 'Escape') {
        closePopup(activePopup);
        return;
    }

    //открытие попапа добавления карточки
    if (evt.key === '+') {
        openNewCard();
    }


});

//Вывести карточки на страницу
initialCards.forEach(elem => {
    cardList.append(createCard(elem, deleteCard, likeCard, openImage));
});