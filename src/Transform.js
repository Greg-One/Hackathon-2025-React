import React, {useCallback, useEffect, useState} from 'react';
import header_logo from './assets/images/header_logo.png';
import categories from './units/base';
import {Link} from 'react-router-dom';
import Storage from "./units/storage";
import PropTypes from 'prop-types';

const Transform = ({history, onLawClick, onStepNext}) => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({});
    const [poems, setPoems] = useState([]);
    const [poem, setPoem] = useState('');
    const [currentPoemNum, setCurrentPoemNum] = useState(0);
    const [isNext, setNext] = useState(false);
    const [isTranslate, setTranslate] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const transform = useCallback((currentTag = '', currentNum = 0) => {
        const tagArray = (currentTag) ? currentTag : tag;

        const promises = tagArray.keywords.map((i) => {
            return fetch(encodeURI(`https://www.buymebuyme.xyz/?q=${i}`));
        });

        setLoading(true);

        Promise.all(promises)
            .then((responses) => Promise.all(responses.map((r) => r.json())))
            .then((results) => {
                const poemsData = [];
                results.forEach((result) => {
                    Object.assign(poemsData, result);
                });
                return poemsData;
            })
            .then((res) => {
                if (res.length > 0) {
                    setPoems(res);
                    setPoem(res[currentNum].fields.text);
                    Storage.updateItem({poem: res[currentNum].fields.text});
                } else {
                    setPoem('Стихов нет');
                    Storage.updateItem({poem: 'Стихов нет'});
                }
                setNext(true);
            })
            .catch(() => {
                // Ошибка получения, обработки данных
            })
            .finally(() => setLoading(false));
    }, [tag]);

    useEffect(() => {
        const data = Storage.getItem();

        try {
            if (data.poem) {
                setPoem(data.poem);
            }
        } catch (err) {
            // Нет сохраненного стихотворения
        }

        try {
            const category = categories.find((i) => i.id === data.category);
            setTags(category.tags);

            if (data.tag) {
                const categoryTag = category.tags.find((i) => i.id === data.tag);
                setTag(categoryTag);
                setCurrentPoemNum(data.currentPoemNum);
                if (data.transform) {
                    transform(categoryTag, data.currentPoemNum);
                }
            }
        } catch (err) {
            history.push('./category');
        }
    }, [history]);

    useEffect(() => {
        try {
            setTranslate((tag.id > 0));
        } catch (err) {
            // Нет выбранного тега
        }
    }, [tag.id]);

    useEffect(() => {
        setNext((poem !== ''));
    }, [poem]);


    function handleSubmit() {
        onStepNext();
    }

    function handleTransform() {
        Storage.updateItem({transform: true});
        transform();
    }

    function randPoem() {
        try {
            const num = Math.floor(Math.random() * poems.length);
            setCurrentPoemNum(num);
            setPoem(poems[num].fields.text);
            Storage.updateItem({currentPoemNum: num, poem: poems[num].fields.text});
        } catch (err) {
            // Ошибка выборки
        }
    }

    function prevPoem() {
        let num = currentPoemNum;

        try {
            if (currentPoemNum === 0) {
                num = poems.length;
            } else {
                num -= 1;
            }
            setCurrentPoemNum(num);
            setPoem(poems[num].fields.text);
            Storage.updateItem({currentPoemNum: num, poem: poems[num].fields.text});
        } catch (err) {
            // Ошибка выборки
        }
    }

    function nextPoem() {
        let num = currentPoemNum;

        try {
            if (currentPoemNum >= poems.length - 1) {
                num = 0;
            } else {
                num += 1;
            }
            setCurrentPoemNum(num);
            setPoem(poems[num].fields.text);
            Storage.updateItem({currentPoemNum: num, poem: poems[num].fields.text});
        } catch (err) {
            // Ошибка выборки
        }
    }


    function handleTag(currentTag) {
        setTag(currentTag);
        setPoem('');
        setNext(false);
        Storage.updateItem({tag: currentTag.id});
    }

    return (
        <div className='page'>
            <header className='header header_with_title'>
                <Link to='./'>
                    <img src={header_logo} alt='' className='header__logo'/>
                </Link>
                <div className='header__title-container'>
                    <h2 className='header__title'>2. Трансформируйте Ваше обращение</h2>
                    <p className='header__subtitle'>
                        Выберите теги, соответствующие вашей инициативе и переведите
                        обращение в стих
                    </p>
                </div>
            </header>
            <main>
                <section className='transform'>
                    <div className='transform__poem-container'>
                        
                        <div className="transform__tag-group">
                        <ul className='transform__tag-cloud'>
                            {tags.map((i) => (
                                <li key={i.id}>
                                    <button
                                        className={`transform__tag-container ${
                                            tag.id === i.id ? 'transform__tag-container_active' : ''
                                        }`}
                                        key={i.id}
                                        onClick={() => handleTag(i)}
                                    >
                                        {i.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`button__translate
                           ${!isTranslate ? 'button__translate_disabled' : ''}`}
                            disabled={!isTranslate}
                            onClick={handleTransform}
                        >
                            {isLoading ? 'Переводится...' : 'Перевести'}
                        </button>
                        </div>

                        
                        <div className="transform__poem-group">
                        <textarea
                            disabled
                            name='Пример стихотворения'
                            className='translation'
                            id='transform-translation'
                            defaultValue={poem}
                        />

                 
                        <nav className='transform__translation-controls'>
                            <button
                                className={`transform__poem-navigation
                           ${!isNext ? 'transform__poem-navigation_disabled' : ''}`}
                                disabled={!isNext}
                                onClick={prevPoem}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z'
                                        fill='#0C0E1A'
                                    />
                                </svg>
                            </button>
                            <button
                                className={`transform__poem-navigation
                           ${!isNext ? 'transform__poem-navigation_disabled' : ''}`}
                                disabled={!isNext}
                                onClick={randPoem}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z'
                                        fill='#0C0E1A'
                                    />
                                </svg>
                            </button>
                            <button
                                className={`transform__poem-navigation
                           ${!isNext ? 'transform__poem-navigation_disabled' : ''}`}
                                disabled={!isNext}
                                onClick={nextPoem}
                            >
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z'
                                        fill='#0C0E1A'
                                    />
                                </svg>
                            </button>
                        </nav>
                
                </div>
                    </div>
                   

                    <div className='transform__footer'>
                        <div className='transform__footer-info'>
                            <button
                                type='button'
                                className='transform__disclaimer'
                                onClick={onLawClick}
                            >
                                <svg
                                    className='transform__disclaimer-question'
                                    width='25'
                                    height='24'
                                    viewBox='0 0 25 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M11.338 18H13.3994V16H11.338V18ZM12.3687 2C6.67913 2 2.06152 6.48 2.06152 12C2.06152 17.52 6.67913 22 12.3687 22C18.0582 22 22.6759 17.52 22.6759 12C22.6759 6.48 18.0582 2 12.3687 2ZM12.3687 20C7.82323 20 4.12296 16.41 4.12296 12C4.12296 7.59 7.82323 4 12.3687 4C16.9142 4 20.6144 7.59 20.6144 12C20.6144 16.41 16.9142 20 12.3687 20ZM12.3687 6C10.0908 6 8.24582 7.79 8.24582 10H10.3073C10.3073 8.9 11.2349 8 12.3687 8C13.5025 8 14.4301 8.9 14.4301 10C14.4301 12 11.338 11.75 11.338 15H13.3994C13.3994 12.75 16.4916 12.5 16.4916 10C16.4916 7.79 14.6466 6 12.3687 6Z'
                                        fill='#0C0E1A'
                                    />
                                </svg>
                                Почему объявление должно быть трансформировано в стихотворную
                                форму?
                            </button>
                        </div>
                        <nav className='button__container'>
                            <button
                                className='button__reverse'
                                onClick={() => history.push('./category')}
                            >
                                Назад
                            </button>
                            <button
                                type='submit'
                                className={`button__next-page                   ${
                                    !isNext ? 'button__next-page_disabled' : ''
                                }`}
                                disabled={!isNext}
                                onClick={handleSubmit}
                            >
                                Далее
                            </button>
                        </nav>
                    </div>
                </section>
            </main>
        </div>
    );
}

Transform.propTypes = {
    onLawClick: PropTypes.func.isRequired,
    onStepNext: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    fields: PropTypes.object,
}

export default Transform;