import { FC } from 'react';
import styles from './inputText.module.scss';

interface IProps {
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  searched?: boolean;
}

const InputText: FC<IProps> = ({ className, placeholder, onChange, value, searched }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={className ? `${styles.textField} ${className}` : styles.textField}>
      <input
        className={styles.textFieldInput}
        type="text"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
      ></input>
      {searched && <span className={styles.textFieldIcon} />}
    </div>
  );
};

export default InputText;
