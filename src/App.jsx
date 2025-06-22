import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./routes";
// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <AppRoutes />
      {/* <Toaster /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
