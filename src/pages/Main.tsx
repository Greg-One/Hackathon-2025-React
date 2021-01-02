import React from 'react';
import History from 'history';
import card01 from '../assets/images/card01.png';
import card02 from '../assets/images/card02.png';
import card03 from '../assets/images/card03.png';
import card04 from '../assets/images/card04.png';
import headerLogo from '../assets/images/header_logo.png';

interface MainProps {
  onLawClick(): void,
  history: History.History
}

const Main: React.FC<MainProps> = ({ onLawClick, history }) => (
  <div className="page">
    <header className="header">
      <img src={headerLogo} alt="" className="header__logo" />
      <button type="button" className="header__policy" onClick={onLawClick}>
        Политика конфиденциальности
      </button>
    </header>
    <main>
      <section className="mainpage">
        <h1 className="mainpage__title">Гражданин-поэт 2025</h1>
        <p className="mainpage__subtitle">
          До успешной подачи инициативы вам осталось 4 шага
        </p>
        <ul className="mainpage__cards">
          <li className="mainpage__card">
            <img
              src={card01}
              alt="Изображение блокнота и ручки"
              className="mainpage__card-image"
            />
            <p className="mainpage__card-title">1. Обозначьте проблему</p>
          </li>
          <hr className="mainpage__cards-line" />
          <li className="mainpage__card">
            <img
              src={card02}
              alt="Две иконки сообщений"
              className="mainpage__card-image"
            />
            <p className="mainpage__card-title">
              2. Переведите обращение в стих
            </p>
          </li>
          <hr className="mainpage__cards-line" />
          <li className="mainpage__card">
            <img
              src={card03}
              alt="Коробка с бумагами"
              className="mainpage__card-image"
            />
            <p className="mainpage__card-title">3. Подайте обращение</p>
          </li>
          <hr className="mainpage__cards-line" />
          <li className="mainpage__card">
            <img
              src={card04}
              alt="Лист с печатью"
              className="mainpage__card-image"
            />
            <p className="mainpage__card-title">4. Ожидайте результата</p>
          </li>
        </ul>
        <button
          type="submit"
          className="button__submit"
          onClick={() => history.push('./category')}
        >
          Подать обращение
        </button>
      </section>
    </main>
    <footer className="footer">
      <p className="footer__description">
        Мы — некоммерческая организация, продвигающая гражданские инициативы
        через фильтры цензуры с помощью поэзии
      </p>
    </footer>
  </div>
);

export default Main;
