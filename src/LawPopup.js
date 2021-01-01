import React, { memo } from 'react';
import PropTypes from 'prop-types';
import popupLogo from './assets/images/popup__logo.png';
import EventClosePopup from './EventClosePopup';

const LawPopup = ({ isOpen, onClose }) => (
  <section className={`popup popup__lawquote ${isOpen ? 'popup_is-opened' : ''}`}>
    <EventClosePopup isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="popup__close-button popup__lawquote_close-button"
        />
        <div className="popup__redline" />
        <img src={popupLogo} alt="" className="popup__logo" />
        <p className="popup__text">
          В соответствии с законом Российской Федерации
          № 1217-3/Ц от 12.06.2025 г. «О возможности ограничения свободы слова
          при обращении в органы местного самоуправления» изменены требования
          к подаче заявления в органы местного самоуправления.
        </p>
        <p className="popup__text">
          На основании п. 12 ст. 73 настоящего закона Заявитель обязан строго
          соблюдать предписанную форму подачи заявления. В случае своевольного
          обращения в органы местного самоуправления и/или несоблюдения
          соответствующей формы, Адресат имеет право не рассматривать обращение,
          а также обязан оповестить Министерство культуры и просвещения
          о неправомерном случае (в соответствии с п. 6 ст. 17).
        </p>
        <p className="popup__text">
          Заявитель имеет право воспользоваться сервисом для подачи заявления.
          Со списком сервисов, одобренных Министерством культуры и просвещения
          вы можете ознакомиться на сайте grazhdanin-poet.ru.
        </p>
        <p className="popup__text">
          Данный сервис является аккредитованным поставщиком услуги «Сервис для
          подачи заявления в органы местного самоуправления”и имеет лицензию
          ИА-47-8 053 205-КР.
        </p>
      </div>
    </EventClosePopup>
  </section>
);

LawPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return nextProps.isOpen === prevProps.isOpen;
}

export default memo(LawPopup, areEqual);
