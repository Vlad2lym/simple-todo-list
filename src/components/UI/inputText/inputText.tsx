import { FC, useState } from 'react';
import styles from './inputText.module.scss';

interface IProps {
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  searched?: boolean;
}

const InputText: FC<IProps> = ({ className, placeholder, onChange, value, searched }) => {
  const [input, setInput] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searched) {
      setInput(e.target.value);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className ? `${styles['text-field']} ${className}` : styles['text-field']}>
      <input
        className={styles['text-field__input']}
        type="text"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={searched ? input : value}
      ></input>
      {searched && <span className={styles['text-field__icon']} onClick={() => onChange(input)} />}
    </div>
  );
};

export default InputText;
