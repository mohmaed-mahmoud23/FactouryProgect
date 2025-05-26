import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Regester from "../components/Regester";
import ErrorHandler from "../components/ErrorComponant";
import Home from "../Pages/Home";
import Layout from "../Pages/Layout";
import Logen from "../components/Logen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

      <Route path="/regestr" element={<Regester />} />
      <Route path="/Logen" element={<Logen/>} />
      </Route>
      <Route path="*" element={<ErrorHandler />} />
    </>
  )
);

export default router;
