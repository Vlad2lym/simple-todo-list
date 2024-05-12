import { FC, useCallback, useEffect, useRef, useState } from 'react';
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
  const [currentItem, setCurrentItem] = useState<Option>(options.length ? options[0] : { id: 0, title: '', value: '' });

  const onClickItem = (item: Option) => {
    setCurrentItem(item);
    setIsSelectOpen(false);
    onChange(item);
  };

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isSelectOpen && setIsSelectOpen(false);
      }
    },
    [isSelectOpen],
  );

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <div className={className ? `${styles.select} ${className}` : styles.select} ref={rootRef}>
      <div
        className={isSelectOpen ? `${styles.selectHeader} ${styles.selectHeaderFocus}` : styles.selectHeader}
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <span className={styles.selectCurrent}>{currentItem.title}</span>
        <img src={isSelectOpen ? arrowUp : arrowDown} className={styles.selectIcon} />
      </div>
      <div className={styles.selectBody} style={{ display: isSelectOpen ? 'block' : 'none' }}>
        {options?.map((option) => {
          return (
            <div key={option.id} className={styles.selectItem} onClick={() => onClickItem(option)}>
              {option.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSelect;
