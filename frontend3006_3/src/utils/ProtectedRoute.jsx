import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    toast.error("Unauthorized!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedRoute;
