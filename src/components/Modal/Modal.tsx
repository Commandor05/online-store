import React  from 'react';
import {ModalProps} from '../../types/Page';
import styles from './Modal.module.scss';

const Modal = ({ onClose, children ,show }: ModalProps)  => {
  const  closeModal = () => {
    onClose && onClose();
  };

  const preventClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  if (!show) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.content} onClick={preventClose}>
        {children}
      </div>
    </div>
  );
}

export default Modal;