import styles from './darkModeButton.module.scss';

interface IProps {
  onChange: () => void;
}

const DarkModeButton = ({ onChange }: IProps) => {
  return <button className={styles.darkModeButton} onClick={() => onChange()} />;
};

export default DarkModeButton;
