import toast from "react-hot-toast";

const HotToast = (type: string, message: string) => {
  switch (type) {
    case "success":
      toast.success(message, { icon: "👏" });
      break;
    case "error":
      toast.error(message, { icon: "👏" });
      break;
    case "loading":
      toast.loading(message, { duration: 500 });
      break;
  }
};
export default HotToast;
