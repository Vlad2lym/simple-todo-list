import { FC } from 'react';
import styles from './customButton.module.scss';

interface IProps {
  children: any;
  className?: string;
  primary?: boolean;
  onClick: () => void;
}

const CustomButton: FC<IProps> = ({ children, className, primary, onClick }) => {
  const buttonStyle = primary ? `${styles['custom-button']} ${styles['primary']}` : `${styles['custom-button']}`;

  return (
    <button className={className ? `${buttonStyle} ${className}` : buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
