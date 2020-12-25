import React, {useEffect, useState} from 'react';
import header_logo from './assets/images/header_logo.png';
import categories from './units/base';
// import category1 from './assets/images/category1.svg';
import { ReactComponent as Category1 } from './assets/images/category1.svg';
import {Link} from "react-router-dom";

export default function Category({history}) {
    const [category, setCategory] = useState(0);
    const [isNext, setNext] = useState(false);

    let data = '';
    useEffect(() => {
        data = localStorage.getItem('data');
        data = JSON.parse(data);
        if (data) {
            console.log('set category');
            setCategory(data.category);
        }
    }, [])

    useEffect(() => {
        setNext((category > 0));
    }, [category]);

    function handleCategory(id) {
        setCategory(id);
        localStorage.setItem('data', JSON.stringify({category: id, tag: {}, currentPoemNum: 0}));
    }

    return (
        <div className="page">
            <header className="header header_with_title">
                <Link to="/"><img src={header_logo} alt="" className="header__logo"/></Link>
                <div className="header__title-container">
                    <h2 className="header__title">1. Обозначьте проблему</h2>
                    <p className="header__subtitle">
                        Выберите категорию инициативы из списка ниже
                    </p>
                </div>
            </header>
            <main>
                <section className="categories">
                    <ul className="categories__card-list">
                        {categories.map((i) => (
                            <li className={`categories__card ${category === i.id ? 'transform__tag-container_active' : ''}`}
                                key={i.id}>
                                <Category1/>
                                <p className="categories__card-title" onClick={() => handleCategory(i.id)}>{i.name}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="button__container">
                        <button type="submit"
                                className={`button__next-page ${!isNext ? 'button__next-page_disabled' : ''}`}
                                disabled={!isNext}
                                onClick={() => history.push('/transform')}
                        >Далее
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}