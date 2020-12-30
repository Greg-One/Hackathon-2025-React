import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import header_logo from './assets/images/header_logo.png';
import Storage from "./units/storage";

const Submit = ({onSubmit, history}) => {
    const [poem, setPoem] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isSubmit, setSubmit] = useState(false);

    useEffect(() => {
        setSubmit(email !== '' && name !== '' && phone !== '' && address !== '');
    }, [name, email, phone, address]);

    useEffect(() => {
        const data = Storage.getItem();
        try {
            if (data.poem) {
                setPoem(data.poem);
            }
        } catch {
            history.push('./category');
        }
    }, [history]);

    function handleSubmitSend(e) {
        e.preventDefault();
        onSubmit({email});
        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
    }

    return (
        <div className='page'>
            <header className='header header_with_title'>
                <Link to='./'>
                    <img src={header_logo} alt='' className='header__logo'/>
                </Link>
                <div className='header__title-container'>
                    <h2 className='header__title'>3. Подайте обращение</h2>
                    <p className='header__subtitle'>Заполните форму подачи обращения</p>
                </div>
            </header>
            <main>
                <section className='submit'>
                    <div className='submit__container'>
                        <form
                            name='appeal-submit'
                            className='submit__form'
                            id='form-submit'
                            onSubmit={handleSubmitSend}
                        >
                            <fieldset name='contacts' className='submit__contacts'>
                                <div className='submit__input-container'>
                                    <label htmlFor='name' className='submit__label'>
                                        Имя
                                    </label>
                                    <input
                                        type='text'
                                        name='name'
                                        required
                                        minLength='2'
                                        maxLength='40'
                                        className='submit__input submit__input_type_text'
                                        id='name-input'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <span
                                        className='submit__input-error'
                                        id='name-input-error'
                                    />
                                </div>

                                <div className='submit__contacts-container'>
                                    <div className='submit__input-container'>
                                        <label htmlFor='telephone' className='submit__label'>
                                            Телефон
                                        </label>
                                        <input
                                            type='tel'
                                            name='telephone'
                                            required
                                            minLength='2'
                                            maxLength='15'
                                            className='submit__input submit__input_type_tel'
                                            id='tel-input'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <span
                                            className='submit__input-error submit__input-error_contacts'
                                            id='tel-input-error'
                                        />
                                    </div>

                                    <div className='submit__input-container'>
                                        <label htmlFor='email' className='submit__label'>
                                            E-mail
                                        </label>
                                        <input
                                            type='email'
                                            name='Email'
                                            required
                                            minLength='2'
                                            maxLength='30'
                                            className='submit__input submit__input_type_email'
                                            id='email-input'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span
                                            className='submit__input-error submit__input-error_contacts'
                                            id='email-input-error'
                                        />
                                    </div>
                                </div>

                                <div className='submit__input-container'>
                                    <label htmlFor='address' className='submit__label'>
                                        Адрес
                                    </label>
                                    <input
                                        type='text'
                                        name='address'
                                        required
                                        minLength='2'
                                        maxLength='50'
                                        className='submit__input submit__input_type_text'
                                        id='address-input'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <span
                                        className='submit__input-error'
                                        id='address-input-error'
                                    />
                                </div>
                            </fieldset>
                        </form>

                        <div className='submit__poem-example'>
                            <label htmlFor='Пример стихотворения' className='submit__label'>
                                Обращение
                            </label>
                            <textarea
                                disabled
                                name='Пример стихотворения'
                                className='translation translation_submit'
                                value={poem}
                                id='submit-translation'
                            />
                        </div>
                    </div>
                    <div className='submit__navigation'>
                        <nav className='button__container button__container_submit'>
                            <button
                                type='reset'
                                className='button__reverse button__reverse_submit'
                                onClick={() => history.push('./transform')}
                                form='form'
                            >
                                Назад
                            </button>
                            <button
                                type='submit'
                                className={`button__submit button__submit ${
                                    !isSubmit ? 'button__submit_disabled' : ''
                                }`}
                                disabled={!isSubmit}
                                form='form-submit'
                            >
                                Подать обращение
                            </button>
                        </nav>
                    </div>
                </section>
            </main>
        </div>
    );
}

Submit.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
}

export default Submit;