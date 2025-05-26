// import Login from "./pages/Login";
// import Connter from "./pages/Connter";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />

      {/* <Login /> */}
      {/* <Connter /> */}
    </div>
  );
};

export default App;
