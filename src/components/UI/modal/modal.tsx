import { FC } from 'react';
import styles from './modal.module.scss';

interface IProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<IProps> = ({ show, onClose, children }) => {
  return (
    <div className={show ? `${styles.modal} ${styles.active}` : styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
