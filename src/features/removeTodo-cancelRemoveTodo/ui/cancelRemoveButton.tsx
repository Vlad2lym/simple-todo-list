import styles from '../styles/cancelRemoveButton.module.scss';

interface IProps {
  className?: string;
  style?: Record<string, string>;
  onClick: () => void;
  title: string;
}

export const CancelRemoveButton = ({ className, onClick, style, title }: IProps) => {
  return (
    <div className={className ? `${styles.cancelBtnWrapper} ${className}` : styles.cancelBtnWrapper} style={style}>
      <button onClick={onClick}>
        <div className={styles.cancelBtnTimer}>
          <div className={styles.cancelBtnTimerLine}></div>
          <div className={styles.cancelBtnTimerBody}>
            <div className={styles.cancelBtnTimerCounter}>
              <span>5</span>
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.cancelBtnTitleField}>
          <p className={styles.cancelBtnText}>{title}</p>
        </div>
        <div className={styles.cancelBtnLogo}>
          <p className={styles.cancelBtnText}>UNDO</p>
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5.4394V11.4318C14.9993 12.1127 14.7236 12.7656 14.2333 13.247C13.743 13.7285 13.0782 13.9993 12.3848 14H7.15436V13.1439H12.3848C12.847 13.1433 13.29 12.9627 13.6168 12.6417C13.9437 12.3208 14.1276 11.8857 14.1283 11.4318V5.4394C14.1276 4.98553 13.9437 4.55044 13.6168 4.2295C13.29 3.90857 12.847 3.72796 12.3848 3.72728H1.66851L3.97513 5.99242L3.35881 6.59765L0 3.29925L3.35881 0L3.97513 0.605234L1.66851 2.87122H12.3848C13.0782 2.8719 13.743 3.1427 14.2333 3.62418C14.7236 4.10566 14.9993 4.75849 15 5.4394Z"
              fill="#F7F7F7"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
