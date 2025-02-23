import HomeScreen from "../pages/user/homeScreen";
import SignupScreen from "../pages/signupScreen";
import LayoutUser from "../layouts/layoutUser";
import { useRoutes } from "react-router-dom";
import LoginScreen from "../pages/loginScreen";
import VerifyScreen from "../pages/user/verifyScreen";
import ForgetPassword from "../pages/user/forgetPasswordScreen";
import NewPasswordScreen from "../pages/user/newPasswordScreen";
import ProfileScreen from "../pages/user/profileScreen";
import UpdateProfile from "../pages/user/updateProfileScreen";
import MenuScreen from "../pages/user/menuScreen";
import CartScreen from "../pages/user/cartScreen";
import LayoutAdmin from "../layouts/layoutAdmin";
import adminScreen from "../pages/admin/adminScreen";

import AdminTableScreen from "../pages/admin/adminTableScreen";
import AdminProfileScreen from "../pages/admin/adminProfileScreen";

const Routers = () => {
  const elements = useRoutes([
    {
      path: "/admin-profile",
      element: <LayoutAdmin Page={AdminProfileScreen} />,
    },
    {
      path: "/admin-dashboard",
      element: <LayoutAdmin Page={adminScreen} />,
    },
    {
      path: "/admin-table",
      element: <LayoutAdmin Page={AdminTableScreen} />,
    },

    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/menu",
      element: <LayoutUser Page={MenuScreen}></LayoutUser>,
    },

    {
      path: "/profile",

      element: <LayoutUser Page={ProfileScreen}></LayoutUser>,
    },
    {
      path: "/signup",
      element: <SignupScreen />,
    },
    {
      path: "/signin",
      element: <LoginScreen />,
    },
    {
      path: "/verify",
      element: <VerifyScreen />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword></ForgetPassword>,
    },
    {
      path: "/new-password",
      element: <NewPasswordScreen></NewPasswordScreen>,
    },
    {
      path: "/update-profile",
      element: <UpdateProfile></UpdateProfile>,
    },
    {
      path: "/cart",
      element: <LayoutUser Page={CartScreen}></LayoutUser>,
    },
  ]);
  return <div>{elements}</div>;
};

export default Routers;
