import { FC, useEffect, useRef, useState } from 'react';
import styles from './customSelect.module.scss';
import arrowDown from '../../../assets/icons/arrow-down-icon.svg';
import arrowUp from '../../../assets/icons/arrow-up-icon.svg';
import { Option } from '../../../types/types';

interface IProps {
  className?: string;
  options: Option[];
  onChange: (value: Option) => void;
}

const CustomSelect: FC<IProps> = ({ className, options, onChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState(options.length ? options[0] : { id: 0, value: '' });

  const onClickItem = (item: Option) => {
    setCurrentItem(item);
    setIsSelectOpen(false);
    onChange(item);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isSelectOpen && setIsSelectOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isSelectOpen]);

  return (
    <div className={className ? `${styles.select} ${className}` : styles.select} ref={rootRef}>
      <div
        className={
          isSelectOpen ? `${styles['select__header']} ${styles['select__header--focus']}` : styles['select__header']
        }
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <span className={styles['select__current']}>{currentItem.value}</span>
        <img src={isSelectOpen ? arrowUp : arrowDown} className={styles['select__icon']} />
      </div>
      <div className={styles['select__body']} style={{ display: isSelectOpen ? 'block' : 'none' }}>
        {options?.map((option) => {
          return (
            <div key={option.id} className={styles['select__item']} onClick={() => onClickItem(option)}>
              {option.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSelect;
