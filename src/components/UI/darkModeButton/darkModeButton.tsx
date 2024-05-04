import { FC } from 'react';
import styles from './darkModeButton.module.scss';

interface IProps {
  onChange: () => void;
}

const DarkModeButton: FC<IProps> = ({ onChange }) => {
  return <button className={styles['dark-mode-button']} onClick={() => onChange()} />;
};

export default DarkModeButton;
