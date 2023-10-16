import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostDetails from "./pages/postDetails/PostDetails";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";

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
    path: "/page/:id",
    element: <PostDetails />,
  },
]);

export default function App() {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}
