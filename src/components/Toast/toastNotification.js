import {Toaster, useToaster} from "react-hot-toast";

const ToastNotification = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <Toaster
            key={toast.id}
            toastOptions={{
              className: "toastOptions",
              duration: 3000,
            }}
          />
        ))}
    </div>
  );
};
export default ToastNotification