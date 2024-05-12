import { FC } from 'react';
import styles from './darkModeButton.module.scss';

interface IProps {
  onChange: () => void;
}

const DarkModeButton: FC<IProps> = ({ onChange }) => {
  return <button className={styles.darkModeButton} onClick={() => onChange()} />;
};

export default DarkModeButton;
