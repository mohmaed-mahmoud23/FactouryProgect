// import Login from "./pages/Login";
// import Connter from "./pages/Connter";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />

      {/* <Login /> */}
      {/* <Connter /> */}

      <Toaster />
    </div>
  );
};

export default App;
