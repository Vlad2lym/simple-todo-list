import styles from './darkModeButton.module.scss';

interface IProps {
  onChange: () => void;
}

export const DarkModeButton = ({ onChange }: IProps) => {
  return <button className={styles.darkModeButton} onClick={() => onChange()} />;
};
