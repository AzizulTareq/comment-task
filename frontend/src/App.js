import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostDetails from "./pages/postDetails/PostDetails";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/page/:id",
    element: <PostDetails />,
  },
]);

export default function App() {
  return (
    <div>
      <ToastContainer className="toast" />
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}
