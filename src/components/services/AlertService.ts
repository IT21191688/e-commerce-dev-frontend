import { ToastOptions, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = (message: string, options?: ToastOptions) => {
  const toastOptions: ToastOptions = { ...DEFAULT_TOAST_OPTIONS, ...options };
  toast(message, toastOptions);
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  showToast(message, { ...options, type: "success" });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  showToast(message, { ...options, type: "error" });
};

// Add other custom toast methods here (e.g., showUnsuccessToast, etc.)

export { ToastContainer }; // Export ToastContainer for use in your components
