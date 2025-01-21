import HomeScreen from "../pages/homeScreen";
import SignupScreen from "../pages/signupScreen";
import LayoutUser from "../layouts/layoutUser";
import { useRoutes } from "react-router-dom";
import LoginScreen from "../pages/loginScreen";
import VerifyScreen from "../pages/verifyScreen";

const Routers = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <LayoutUser Page={HomeScreen}></LayoutUser>,
    },
    // {
    //   path: "/profile",
    //   element: <PrivateRouterUser Page={() => <Layout Page={Profile} />} />, // Corrected component name
    // },
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
  ]);
  return <div>{elements}</div>;
};

export default Routers;
