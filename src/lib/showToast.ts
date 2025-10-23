import { toast, Bounce, ToastOptions } from "react-toastify";

interface Props {
  type: "info" | "success" | "error" | "warn"; // chặt chẽ
  message: string;
}

export const showToast = ({ type, message }: Props) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};