import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import * as H from 'history';
import Storage from '../units/storage';
import Header from '../components/Header';
import { IOrder } from '../interfaces';

interface SubmitProps {
  onSubmit(order: IOrder): void,
  history: H.History;
}

const Submit: React.FC<SubmitProps> = ({ onSubmit, history }) => {
  const [poem, setPoem] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isSubmit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    setSubmit(email !== '' && name !== '' && phone !== '' && address !== '');
  }, [name, email, phone, address]);

  useEffect(() => {
    const data = Storage.getItem();
    try {
      if (data.poem) {
        setPoem(data.poem);
      }
    } catch (err) {
      history.push('./category');
    }
  }, [history]);

  function handleSubmitSend(e:React.FormEvent) {
    e.preventDefault();

    const newOrder: IOrder = {
      email,
    };
    onSubmit(newOrder);

    setName('');
    setEmail('');
    setAddress('');
    setPhone('');
  }

  const handleTransformStep = () => history.push('./transform');

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="page">
      <Header
        title="3. Подайте обращение"
        description="Заполните форму подачи обращения"
      />
      <main>
        <section className="submit">
          <div className="submit__container">
            <form
              name="appeal-submit"
              className="submit__form"
              onSubmit={handleSubmitSend}
              id="form-submit"
            >
              <fieldset name="contacts" className="submit__contacts">
                <div className="submit__input-container">
                  {/* TODO: input обернуть в label, https://reactjs.org/docs/forms.html */}
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="submit__label">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    maxLength={40}
                    className="submit__input submit__input_type_text"
                    onChange={handleChangeName}
                  />
                  {/* TODO: Доработать валидацию на все поля формы */}
                  <span className="submit__input-error" />
                </div>

                <div className="submit__contacts-container">
                  <div className="submit__input-container">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="submit__label">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      required
                      minLength={2}
                      maxLength={15}
                      className="submit__input submit__input_type_tel"
                      value={phone}
                      onChange={handleChangePhone}
                    />
                    <span className="submit__input-error submit__input-error_contacts" />
                  </div>

                  <div className="submit__input-container">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="submit__label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="Email"
                      required
                      minLength={2}
                      maxLength={30}
                      className="submit__input submit__input_type_email"
                      value={email}
                      onChange={handleChangeEmail}
                    />
                    <span className="submit__input-error submit__input-error_contacts" />
                  </div>
                </div>

                <div className="submit__input-container">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="submit__label">
                    Адрес
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    minLength={2}
                    maxLength={50}
                    className="submit__input submit__input_type_text"
                    value={address}
                    onChange={handleChangeAddress}
                  />
                  <span className="submit__input-error" />
                </div>
              </fieldset>
            </form>

            <div className="submit__poem-example">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="submit__label">
                Обращение
              </label>
              <textarea
                disabled
                name="Пример стихотворения"
                className="translation translation_submit"
                value={poem}
              />
            </div>
          </div>
          <div className="submit__navigation">
            <nav className="button__container button__container_submit">
              <button
                type="submit"
                className="button__reverse button__reverse_submit"
                onClick={handleTransformStep}
              >
                Назад
              </button>
              <button
                type="submit"
                className={classNames('button__submit', {
                  button__submit_disabled: !isSubmit,
                })}
                disabled={!isSubmit}
                form="form-submit"
              >
                Подать обращение
              </button>
            </nav>
          </div>
        </section>
      </main>
    </div>
  );
};

// Submit.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Submit;
