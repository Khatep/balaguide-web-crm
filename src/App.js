// src/App.js
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
  //   git add .
  // git commit -m "Fixed typo in AppRoutes and created LandingPage"
  // git push origin main
}

export default App;
