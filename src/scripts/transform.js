'use strict';

const popupPolicyOpenButton = document.querySelector('.transform__disclaimer');
const popupLawquote = document.querySelector('.popup__lawquote');
const popupPolicyCloseButton = document.querySelector(
  '.popup__lawquote_close-button'
);

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function openLawPopup() {
  openPopup(popupLawquote);
}

function closeLawPopup() {
  closePopup(popupLawquote);
}

popupPolicyOpenButton.addEventListener('click', openLawPopup);

popupPolicyCloseButton.addEventListener('click', closeLawPopup);
