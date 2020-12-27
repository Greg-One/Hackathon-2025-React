import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";

const EventClosePopup = ({children, isOpen, onClose}) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleCloseEsc = (e) => {
            if (e.keyCode === 27) {
                onClose();
            }
        }
        document.addEventListener('keydown', handleCloseEsc)
        return () => document.removeEventListener('keydown', handleCloseEsc)
    }, []);

    useEffect(() => {
        const handleCloseOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleCloseOutside);
        return () => document.removeEventListener("mousedown", handleCloseOutside);
    }, [ref]);

    return (isOpen) ? <div ref={ref} onClose={onClose}>{children}</div> : children;
}

EventClosePopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default EventClosePopup;