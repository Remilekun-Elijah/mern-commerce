import Swal from "sweetalert2";

const Alert = function({ type = "success", message, timer, cb }) {
  function config(timer = 4000, { type = "success", message, cb }) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: type,
      title: message,
      didDestroy: cb,
    });

    return Toast;
  }
  return config(timer, { type, message, cb });
};

export default Alert;
