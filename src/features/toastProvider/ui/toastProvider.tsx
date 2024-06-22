import { Bounce, ToastContainer } from 'react-toastify';

interface IProps {
  children: React.ReactNode;
  className?: string;
  autoClose?: number | false;
}

export const ToastProvider = ({ children, className, autoClose }: IProps) => {
  return (
    <>
      <ToastContainer
        className={className}
        autoClose={autoClose}
        closeOnClick
        position="bottom-center"
        transition={Bounce}
        closeButton={false}
        hideProgressBar
        pauseOnFocusLoss={false}
      />
      {children}
    </>
  );
};
