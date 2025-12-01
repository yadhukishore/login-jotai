import { Toaster } from "react-hot-toast";
import styles from "./toast.module.scss";

const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName={styles.toastContainer}
      containerStyle={{}}
      toastOptions={{
        className: "toast",
        icon: (
          <span className="material-symbols-rounded fill text-2xl text-info w-6 h-6 flex items-center justify-center">
            info
          </span>
        ),
        duration: 3000,
        success: {
          duration: 3000,
          className: "toast success-toast",
          icon: (
            <span className="material-symbols-rounded fill text-2xl text-success w-6 h-6 flex items-center justify-center">
              check_circle
            </span>
          ),
        },
        error: {
          duration: 3000,
          className: "toast error-toast",
          icon: (
            <span className="material-symbols-rounded fill text-2xl text-critical w-6 h-6 flex items-center justify-center">
              cancel
            </span>
          ),
        },
      }}
    />
  );
};

export default Toast;
