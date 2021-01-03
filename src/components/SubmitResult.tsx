import React from 'react';
import EventClosePopup from './EventClosePopup';

interface SubmitResultProps {
  isOpen: boolean,
  onClose(): void,
  email: string,
}

const SubmitResult: React.FC<SubmitResultProps> = ({ isOpen, onClose, email }) => (
  <section className={`popup popup_submit ${isOpen ? 'popup_is-opened' : ''}`}>
    <EventClosePopup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container popup__container_submit">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="popup__close-button"
        />
        <h3 className="popup__title">Обращение № 123</h3>
        <p className="popup__subtitle">Передано в Управляющую организацию № 3</p>
        <p className="popup__text popup__text_submit">
          Решение будет направлено на электронную почту:
          {' '}
          {email}
        </p>

        <button
          type="button"
          className="button button_next-page button_next-page_confirm"
          onClick={onClose}
        >
          Ок
        </button>
      </div>
    </EventClosePopup>
  </section>
);

export default SubmitResult;
