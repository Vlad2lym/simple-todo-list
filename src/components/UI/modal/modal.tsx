import { FC } from 'react';
import styles from './modal.module.scss';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
  return (
    <div className={show ? `${styles.modal} ${styles.active}` : styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
