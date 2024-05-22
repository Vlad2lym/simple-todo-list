import styles from './title.module.scss';

interface IProps {
  children: string;
  className?: string;
}

const Title = ({ children, className }: IProps) => {
  return (
    <div className={className}>
      <h1 className={styles.title}>{children}</h1>
    </div>
  );
};

export default Title;
