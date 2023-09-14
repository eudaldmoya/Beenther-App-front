import { toast } from "react-toastify";

export const showFeedback = (message: string, type: "error" | "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 2000,
    theme: "colored",
    className: "toast",
  });
};
