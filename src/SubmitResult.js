import React, {memo} from "react";
import PropTypes from "prop-types";

const SubmitResult = ({isOpen, onClose, onOk, email}) => {
    return (
        <section className={`popup popup__submit ${isOpen ? "popup_is-opened" : ''}`}>
            <div className="popup__container popup__container_submit">
                <button type="button" aria-label="Закрыть"
                        onClick={onClose}
                        className="popup__close-button popup__submit_close-button"/>
                <h3 className="popup__title">Обращение № 123</h3>
                <p className="popup__subtitle">Передано в Управляющую организацию № 3</p>
                <p className="popup__text popup__text_submit">
                    Решение будет направлено на электронную почту: {email}
                </p>

                <button type="button" className="button__next-page button__next-page_confirm"
                        onClick={onOk}
                >
                    Ок
                </button>
            </div>
        </section>
    );
};

SubmitResult.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
}

function areEqual(prevProps, nextProps) {
    return (
        nextProps.isOpen === prevProps.isOpen
    );
}

export default memo(SubmitResult, areEqual);