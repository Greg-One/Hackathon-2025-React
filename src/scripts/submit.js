// Скрипт для демонтсрации функционала, позже будет переработан

'use strict';

const popupSubmitOpenButton = document.querySelector(
  '.button__submit_popup-open'
);
const popupSubmit = document.querySelector('.popup__submit');
const popupSubmitCloseButton = document.querySelector(
  '.popup__submit_close-button'
);
const popupOkeyButton = document.querySelector('.button__next-page_confirm');

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function openSubmitPopup() {
  openPopup(popupSubmit);
}

function closeSubmitPopup() {
  closePopup(popupSubmit);
}

popupSubmitOpenButton.addEventListener('click', openSubmitPopup);

popupSubmitCloseButton.addEventListener('click', closeSubmitPopup);
popupOkeyButton.addEventListener('click', closeSubmitPopup);
