import { FC } from 'react';
import styles from './modal.module.scss';

interface IProps {
  modalActive: boolean;
  setModalActive: (value: boolean) => void;
  children: React.ReactNode;
}

const Modal: FC<IProps> = ({ modalActive, setModalActive, children }) => {
  return (
    <div
      className={modalActive ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setModalActive(false)}
    >
      <div className={styles['modal__content']} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
