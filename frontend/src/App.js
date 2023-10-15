import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import Home from "./components/Home";
import Navbar from "./components/navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
