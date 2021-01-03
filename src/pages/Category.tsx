import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import * as H from 'history';
import categories from '../units/base';
import { ReactComponent as category1 } from '../assets/images/category1.svg';
import { ReactComponent as category2 } from '../assets/images/category2.svg';
import { ReactComponent as category3 } from '../assets/images/category3.svg';
import { ReactComponent as category4 } from '../assets/images/category4.svg';
import { ReactComponent as category5 } from '../assets/images/category5.svg';
import { ReactComponent as category6 } from '../assets/images/category6.svg';
import Storage from '../units/storage';
import Header from '../components/Header';
import { IData } from '../interfaces';

interface CategoryProps {
  history: H.History
}

const Category: React.FC<CategoryProps> = ({ history }) => {
  const [category, setCategory] = useState<number>(0);
  const [isNext, setNext] = useState<boolean>(false);

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

  function handleCategory(id: number) {
    setCategory(id);
    const newData:IData = {
      category: id,
      tag: 0,
      currentPoemNum: 0,
      poem: '',
      transform: false,
    };
    Storage.setItem(newData);
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
            {categories.map(({ id, name }) => (
              <li key={id}>
                <button
                  type="button"
                  className={classNames('categories__card', {
                    categories__card_active: category === id,
                  })}
                  key={id}
                  onClick={() => handleCategory(id)}
                >
                  {React.createElement(categoriesIcon.get(id), {
                    className: 'categories__card-image',
                  })}
                  <p className="categories__card-title">{name}</p>
                </button>
              </li>
            ))}
          </ul>
          <nav className="categories__button-container">
            <button
              type="submit"
              className={classNames('button', 'button__next-page', {
                'button__next-page_disabled': !isNext,
              })}
              disabled={!isNext}
              onClick={handleTransformStep}
            >
              Далее
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
};

export default Category;
