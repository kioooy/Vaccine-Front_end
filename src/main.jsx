import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import LoginPage from "./pages/login/index.jsx";
import RegisterPage from "./pages/register/index.jsx";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/layouts/adminLayouts.jsx";
import VerifyEmailPage from "./pages/verify-email/index.jsx";
import EmailVerification from "./pages/verify-email/index.jsx";
import ChildProfileCreation from "./pages/AddChildProfile/index.jsx";
import UserInformation from "./pages/userinformation/index.jsx";
import HomePage from "./pages/homepage/index.jsx";
import EmailActive from "./pages/active-email/index.jsx";
import ManageProduct from "./pages/admin/manage-product.jsx";
import ManageUser from "./pages/admin/manage-user.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";


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
  {
    path: "/active",
    element: <EmailActive />,
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard/product",
        element: <ManageProduct />,
      },
      {
        path: "/dashboard/user",
        element: <ManageUser />,
      },
    ],
  },
 
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <ToastContainer />
    </PersistGate>
  </Provider>
);

// Single Page Application
// client side rendering
// SEO
