import styles from './customCheckbox.module.scss';

interface IProps {
  id: string;
  checked: boolean;
  onChange: (id: string) => void;
  className?: string;
}

const CustomCheckbox = ({ id, checked, onChange, className }: IProps) => {
  return (
    <div className={className ? `${styles.wrapper} ${className}` : styles.wrapper}>
      <input className={styles.checkbox} type="checkbox" id={id} checked={checked} onChange={() => onChange(id)} />
      <label htmlFor={id}></label>
    </div>
  );
};

export default CustomCheckbox;
