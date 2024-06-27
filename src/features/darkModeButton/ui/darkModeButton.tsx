import styles from './darkModeButton.module.scss';

interface IProps {
  onChange: () => void;
}

export const test_DarkModeBtn = 'test_DarkModeBtn';

export const DarkModeButton = ({ onChange }: IProps) => {
  return <button className={styles.darkModeButton} onClick={() => onChange()} data-testid={test_DarkModeBtn} />;
};
