import { FC } from 'react';
import styles from './title.module.scss';

interface IProps {
  children: string;
  className?: string;
}

const Title: FC<IProps> = ({ children, className }) => {
  return <h1 className={className ? `${styles.title} + ${className}` : styles.title}>{children}</h1>;
};

export default Title;
