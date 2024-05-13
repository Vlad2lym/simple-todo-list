import { FC, ReactNode } from 'react';
import styles from './header.module.scss';
import Title from '../title/title';

interface IProps {
  children: ReactNode;
  titleText: string;
  className?: string;
}

const Header: FC<IProps> = ({ children, titleText, className }) => {
  return (
    <div className={className}>
      <Title className={styles.headerTitle}>{titleText}</Title>
      <div className={styles.headerSettings}>{children}</div>
    </div>
  );
};

export default Header;
