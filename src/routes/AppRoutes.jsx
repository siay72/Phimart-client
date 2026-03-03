import { Route, Routes } from "react-router";
import Home from "../pages/Home.jsx";
import Shop from "../pages/Shop.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import ActivateAccount from "../components/Registration/ActivateAccount.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Profile from "../pages/Profile.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes  */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
      </Route>
      {/* Private Routes  */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;