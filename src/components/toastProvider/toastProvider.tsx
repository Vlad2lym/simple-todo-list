import { Bounce, ToastContainer } from 'react-toastify';

interface IProps {
  children: React.ReactNode;
  className?: string;
  autoClose?: number | false;
}

const ToastProvider = ({ children, className, autoClose }: IProps) => {
  return (
    <>
      {children}
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
    </>
  );
};

export default ToastProvider;
