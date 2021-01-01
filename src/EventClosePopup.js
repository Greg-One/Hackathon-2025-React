import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const EventClosePopup = ({ children, isOpen, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const handleCloseEsc = (e) => {
        if (e.keyCode === 27) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleCloseEsc);
      return () => document.removeEventListener('keydown', handleCloseEsc);
    }
    return undefined;
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const handleCloseOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleCloseOutside);
      return () => document.removeEventListener('mousedown', handleCloseOutside);
    }
    return undefined;
  }, [ref, isOpen, onClose]);

  return (isOpen) ? <div ref={ref} onClose={onClose}>{children}</div> : children;
};

EventClosePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default EventClosePopup;
