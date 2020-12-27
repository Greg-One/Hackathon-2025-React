import React, {useEffect, useState} from 'react';
import header_logo from './assets/images/header_logo.png';
import categories from './units/base';
import category1 from './assets/images/category1.svg';
import category2 from './assets/images/category2.svg';
import category3 from './assets/images/category3.svg';
import category4 from './assets/images/category4.svg';
import category5 from './assets/images/category5.svg';
import category6 from './assets/images/category6.svg';
import {Link} from 'react-router-dom';
import Storage from './units/storage';
import PropTypes from 'prop-types';


const Category = ({history}) => {
    const [category, setCategory] = useState(0);
    const [isNext, setNext] = useState(false);

    // TODO Доработать, чтобы иконки не зависили от массива переменных (не нужно было добавлять)
    const categoriesIcon = new Map();
    categoriesIcon.set(1, category1);
    categoriesIcon.set(2, category2);
    categoriesIcon.set(3, category3);
    categoriesIcon.set(4, category4);
    categoriesIcon.set(5, category5);
    categoriesIcon.set(6, category6);

    useEffect(() => {
        const data = Storage.getItem();
        try {
            if (data.category) {
                setCategory(data.category);
            }
        } catch (err) {
            // Нет сохраненной категории
        }
    }, []);

    useEffect(() => {
        setNext(category > 0);
    }, [category]);

    function handleCategory(id) {
        setCategory(id);
        Storage.setItem({category: id, tag: 0, currentPoemNum: 0, poem: '', transform: false});
    }

    return (
        <div className='page'>
            <header className='header header_with_title'>
                <Link to='/'>
                    <img src={header_logo} alt='' className='header__logo'/>
                </Link>
                <div className='header__title-container'>
                    <h2 className='header__title'>1. Обозначьте проблему</h2>
                    <p className='header__subtitle'>
                        Выберите категорию инициативы из списка ниже
                    </p>
                </div>
            </header>
            <main>
                <section className='categories'>
                    <ul className='categories__card-list'>
                        {categories.map((i) => (
                            <li key={i.id}>
                                <button
                                    className={`categories__card ${
                                        category === i.id ? 'categories__card_active' : ''
                                    }`}
                                    key={i.id}
                                    onClick={() => handleCategory(i.id)}
                                >
                                    <img src={categoriesIcon.get(i.id)} alt=""/>
                                    <p className='categories__card-title'>{i.name}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className='button__container button__container_categories'>
                        <button
                            type='submit'
                            className={`button__next-page ${
                                !isNext ? 'button__next-page_disabled' : ''
                            }`}
                            disabled={!isNext}
                            onClick={() => history.push('/transform')}
                        >
                            Далее
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

Category.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired
}

export default Category;