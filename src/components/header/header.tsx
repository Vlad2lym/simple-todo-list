import { ReactNode } from 'react';
import styles from './header.module.scss';
import Title from '../title/title';

interface IProps {
  children: ReactNode;
  titleText: string;
  className?: string;
}

const Header = ({ children, titleText, className }: IProps) => {
  return (
    <div className={className}>
      <Title className={styles.headerTitle}>{titleText}</Title>
      <div className={styles.headerSettings}>{children}</div>
    </div>
  );
};

export default Header;
