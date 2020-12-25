import React from 'react';
import card01 from './assets/images/card01.png';
import card02 from './assets/images/card02.png';
import card03 from './assets/images/card03.png';
import card04 from './assets/images/card04.png';
import header_logo from './assets/images/header_logo.png';


export default function Main({onSetPage, onLawClick, history}) {
    return (
        <div className="page">
            <header className="header">
                <img src={header_logo} alt="" className="header__logo"/>
                <button className="header__policy" onClick={onLawClick}>Политика конфиденциальности</button>
            </header>
            <main>
                <h1 className="mainpage__title">Гражданин-поэт 2025</h1>
                <p className="mainpage__subtitle">
                    До успешной подачи инициативы вам осталось 4 шага
                </p>
                <ul className="mainpage__cards">
                    <li className="mainpage__card">
                        <img
                            src={card01}
                            alt=""
                            className="mainpage__card-image"
                        />
                        <p className="mainpage__card-title">1. Обозначьте проблему</p>
                    </li>
                    <hr className="mainpage__cards-line"/>
                    <li className="mainpage__card">
                        <img
                            src={card02}
                            alt=""
                            className="mainpage__card-image"
                        />
                        <p className="mainpage__card-title">2. Переведите обращение в стих</p>
                    </li>
                    <hr className="mainpage__cards-line"/>
                    <li className="mainpage__card">
                        <img
                            src={card03}
                            alt=""
                            className="mainpage__card-image"
                        />
                        <p className="mainpage__card-title">3. Подайте обращение</p>
                    </li>
                    <hr className="mainpage__cards-line"/>
                    <li className="mainpage__card">
                        <img
                            src={card04}
                            alt=""
                            className="mainpage__card-image"
                        />
                        <p className="mainpage__card-title">4. Ожидайте результата</p>
                    </li>
                </ul>
                <button type="submit" className="button__submit" onClick={() => history.push('/category')}>
                    Подать обращение
                </button>
            </main>
            <footer className="footer">
                <p className="footer__description">
                    Мы — некоммерческая организация, продвигающая гражданские инициативы
                    через фильтры цензуры с помощью поэзии
                </p>
            </footer>

            {/*<script src="scripts/index.js"></script>*/}
        </div>

    );
}