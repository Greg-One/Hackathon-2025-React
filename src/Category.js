import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import categories from './units/base';
import { ReactComponent as category1 } from './assets/images/category1.svg';
import { ReactComponent as category2 } from './assets/images/category2.svg';
import { ReactComponent as category3 } from './assets/images/category3.svg';
import { ReactComponent as category4 } from './assets/images/category4.svg';
import { ReactComponent as category5 } from './assets/images/category5.svg';
import { ReactComponent as category6 } from './assets/images/category6.svg';
import Storage from './units/storage';
import Header from './Header';

const Category = ({ history }) => {
  const [category, setCategory] = useState(0);
  const [isNext, setNext] = useState(false);

  // TODO Доработать, чтобы иконки не зависили от массива переменных, массовый импорт
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
      console.log('Нет сохраненной категории');
    }
  }, []);

  useEffect(() => {
    setNext(category > 0);
  }, [category]);

  function handleCategory(id) {
    setCategory(id);
    Storage.setItem({
      category: id, tag: 0, currentPoemNum: 0, poem: '', transform: false,
    });
  }

  const handleTransformStep = () => history.push('./transform');

  return (
    <div className="page">
      <Header
        title="1. Обозначьте проблему"
        description="Выберите категорию инициативы из списка ниже"
      />
      <main>
        <section className="categories">
          <ul className="categories__card-list">
            {categories.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  className={classNames('categories__card', {
                    categories__card_active: category === i.id,
                  })}
                  key={i.id}
                  onClick={() => handleCategory(i.id)}
                >
                  {React.createElement(categoriesIcon.get(i.id), {
                    className: 'categories__card-image',
                  })}
                  <p className="categories__card-title">{i.name}</p>
                </button>
              </li>
            ))}
          </ul>
          <div className="button__container button__container_categories">
            <button
              type="submit"
              className={classNames('button__next-page', {
                'button__next-page_disabled': !isNext,
              })}
              disabled={!isNext}
              onClick={handleTransformStep}
            >
              Далее
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

Category.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Category;
