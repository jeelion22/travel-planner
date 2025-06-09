import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeNav from "./wrappers/HomeNav";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/admin/AdminLogin";
import Home from "./components/Home";
import VerifyAccount from "./components/VerifyAccount";
import CreatePassword from "./components/CreatePassword";
import UserForgotPassword from "./components/UserForgotPassword";
import UserDashboardNav from "./wrappers/UserDashboardNav";
import { loader as UserLoader } from "./wrappers/UserDashboardNav";
import Profile from "./components/Profile";
import Contributions from "./components/Contributions";
import ImageDetails from "./components/ImageDetails";
import NewContribution from "./components/NewContribution";
import UpdateSeekerData from "./components/UpdateSeekerData";
import ContributerDashboard from "./components/UserDashboard";
import UserDashboard from "./components/UserDashboard";
import VerifyPasswordResetLink from "./components/VerifyPasswordResetLink";
import UserPasswordReset from "./components/UserPasswordReset";
import UserUpdate from "./components/UserUpdate";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminDashboardNave, {
  loader as AdminLoader,
} from "./wrappers/AdminDashboardNave";
import AdminProfile from "./components/admin/AdminProfile";
import AdminLookupUsers from "./components/admin/AdminLookupUsers";
import AdminUsersContributions from "./components/admin/AdminUsersContributions";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminForgotPassword from "./components/admin/AdminForgotPassword";
import AdminVerifyPasswordResetLink from "./components/admin/AdminVerifyPasswordResetLink";
import AdminPasswordReset from "./components/admin/AdminPasswordReset";
import CreateAdmin from "./components/admin/CreateAdmin";
import AdminsList from "./components/admin/AdminsList";
import Footer from "./wrappers/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: [<HomeNav />, <Footer />],
    children: [
      { path: "/", element: <Home /> },
      {
        path: "users/register",
        element: <UserRegister />,
      },
      {
        path: "/users/verify/:activationId",
        element: <VerifyAccount />,
      },
      {
        path: "/users/verified/create-password/:userId",
        element: <CreatePassword />,
      },

      {
        path: "/users/forgot-password",
        element: <UserForgotPassword />,
      },

      {
        path: "/users/password/reset/verify/:activationId",
        element: <VerifyPasswordResetLink />,
      },

      {
        path: "/users/password/reset/verified/:userId",
        element: <UserPasswordReset />,
      },

      {
        path: "users/login",
        element: <UserLogin />,
      },
      { path: "admins/login", element: <AdminLogin /> },
      {
        path: "/admins/forgot-password",
        element: <AdminForgotPassword />,
      },
      {
        path: "/admins/password/reset/verify/:activationId",
        element: <AdminVerifyPasswordResetLink />,
      },
      {
        path: "/admins/password/reset/verified/:adminId",
        element: <AdminPasswordReset />,
      },
    ],
  },
  {
    path: "admins",
    loader: AdminLoader,
    element: [<AdminDashboardNave />, <Footer />],
    children: [
      { path: "profile", loader: AdminLoader, element: <AdminProfile /> },
      {
        path: "users",
        loader: AdminLoader,
        element: <AdminLookupUsers />,
      },
      {
        path: "contributions",
        element: <AdminUsersContributions />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        path: "admins-list",
        loader: AdminLoader,
        element: <AdminsList />,
      },
    ],
  },
  {
    path: "users",

    element: [<UserDashboardNav />, <Footer />],
    loader: UserLoader,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
        loader: UserLoader,
      },
      {
        path: "profile",
        loader: UserLoader,
        element: <Profile />,
      },
      {
        path: "profile/update",
        loader: UserLoader,
        element: <UserUpdate />,
      },
      {
        path: "contributions",
        loader: UserLoader,
        element: <Contributions />,
        children: [
          {
            path: ":imageId",
            loader: UserLoader,
            element: <ImageDetails />,
          },
        ],
      },
      {
        path: "contributions/new",
        loader: UserLoader,
        element: <NewContribution />,
      },
      {
        path: "contributions/edit/:imageId",
        element: <UpdateSeekerData />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
