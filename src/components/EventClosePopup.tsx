import React, { useEffect, useRef } from 'react';

interface EventClosePopupProps {
  children: React.ReactNode,
  isOpen: boolean,
  onClose(): void,
}

const EventClosePopup: React.FC<EventClosePopupProps> = ({ children, isOpen, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleKeyPressEsc = (e:KeyboardEvent): void => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyPressEsc);
      return () => document.removeEventListener('keydown', handleKeyPressEsc);
    }
    return undefined;
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const handleMouseClick = (e: MouseEvent): void => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleMouseClick);
      return () => document.removeEventListener('mousedown', handleMouseClick);
    }
    return undefined;
  }, [ref, isOpen, onClose]);

  return isOpen ? <div ref={ref}>{children}</div> : <>children</>;
};

export default EventClosePopup;
