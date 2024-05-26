import { ReactNode } from 'react';
import styles from './../styles/index.module.scss';
import { Title } from '../../../shared/ui/title';

interface IProps {
  children: ReactNode;
  titleText: string;
  className?: string;
}

export const Header = ({ children, titleText, className }: IProps) => {
  return (
    <div className={className}>
      <Title className={styles.headerTitle}>{titleText}</Title>
      <div className={styles.headerSettings}>{children}</div>
    </div>
  );
};
