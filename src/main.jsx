import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import LoginPage from "./pages/login/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import { ToastContainer } from "react-toastify";
import UserManagement from "./UserManagement.jsx";
import AdminLayout from "./components/layouts/adminLayouts.jsx";
import VerifyEmailPage from "./pages/verify-email/index.jsx";
import EmailVerification from "./pages/verify-email/index.jsx";
import ChildProfileCreation from "./pages/AddChildProfile/index.jsx";
import UserInformation from "./pages/userinformation/index.jsx";
import HomePage from "./pages/homepage/index.jsx";

// document.getElementById('root')
// 1. Tìm tới root
// 2. Lấy code ở trong App gắn vào root

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
   {
    path: "/dashboard",
    element: <AdminLayout />,
  },
  {
    path: "/verify",
    element: <EmailVerification />,
  },
  {
    path: "/childprofile",
    element: <ChildProfileCreation />,
  },
  {
    path: "/userprofile",
    element: <UserInformation />,
  },
 
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer/>
  </>
);

// Single Page Application
// client side rendering
// SEO
