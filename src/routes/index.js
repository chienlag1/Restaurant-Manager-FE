import HomeScreen from "../pages/homeScreen";
import SignupScreen from "../pages/signupScreen";
import LayoutUser from "../layouts/layoutUser";
import { useRoutes } from "react-router-dom";
import LoginScreen from "../pages/loginScreen";
import VerifyScreen from "../pages/verifyScreen";
import ForgetPassword from "../pages/forgetPasswordScreen";
import NewPasswordScreen from "../pages/newPasswordScreen";
import ProfileScreen from "../pages/profileScreen";

import UpdateProfile from "../pages/updateProfileScreen";



const Routers = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <LayoutUser Page={HomeScreen}></LayoutUser>,
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
  ]);
  return <div>{elements}</div>;
};

export default Routers;
