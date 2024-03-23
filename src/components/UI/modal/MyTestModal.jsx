import React from 'react';
import cl from './MyTestModal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={cl.modalOverlay} onClick={onClose}>
            <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={onClose} className={cl.modalCloseButton}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
