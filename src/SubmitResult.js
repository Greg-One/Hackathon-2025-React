import React, {memo} from "react";
import PropTypes from "prop-types";
import EventClosePopup from "./EventClosePopup";

const SubmitResult = ({isOpen, onClose, email}) => {
    return (
        <section className={`popup popup__submit ${isOpen ? "popup_is-opened" : ''}`}>
            <EventClosePopup isOpen={isOpen} onClose={onClose}>
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
                            onClick={onClose}
                    >
                        Ок
                    </button>
                </div>
            </EventClosePopup>
        </section>
    );
};

SubmitResult.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
}

function areEqual(prevProps, nextProps) {
    return (
        nextProps.isOpen === prevProps.isOpen
    );
}

export default memo(SubmitResult, areEqual);