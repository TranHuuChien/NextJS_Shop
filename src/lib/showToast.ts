import { toast, Bounce, ToastOptions } from "react-toastify";

interface Props {
  type: "info" | "success" | "error" | "warn"; // thêm type để chặt chẽ hơn
  message: string;
}

export const showToast = (props: Props) => {
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

  switch (props.type) {
    case "info":
      toast.info(props.message, options);
      break;
    case "success":
      toast.success(props.message, options);
      break;
    case "error":
      toast.error(props.message, options);
      break;
    case "warn":
      toast.warn(props.message, options);
      break;
    default:
      toast(props.message, options);
      break;
  }
};