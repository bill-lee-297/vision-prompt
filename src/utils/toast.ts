import { toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  toast[type](message, defaultToastOptions);
};
