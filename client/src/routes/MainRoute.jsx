import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../app/Layout/AuthLayout";
import RegisterPage from "../features/Auth/ui/pages/RegisterPage";
import LoginPage from "../features/Auth/ui/pages/LoginPage";
import MainLayout from "../app/Layout/MainLayout";
import AllProducrts from "../features/Products/ui/pages/AllProducrts";
import AdminDashboardLayout from "../app/Layout/AdminDashboardLayout";
import AdminPage from "../features/Admin-Dashboard/ui/pages/AdminPage";
import { useApi } from "../config/api";
import AdminProducts from "../features/Admin-Dashboard/ui/pages/AdminProducts";
import SingleProductPage from "../features/Products/ui/pages/SingleProductPage";
import { useDispatch } from "react-redux";
import { setUser } from "../features/Auth/state/AuthReducer";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,

    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <RegisterPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/main",
    element: <ProtectedRoute userRole="user" />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <AllProducrts />,
          },
          {
            path: ":id",
            element: <SingleProductPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute userRole="seller" />,
    children: [
      {
        path: "",
        element: <AdminDashboardLayout />,
        children: [
          {
            path: "",
            element: <AdminPage />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
        ],
      },
    ],
  },
]);

const MainRoute = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const [loading, setLoading] = useState(true);
  // /auth/me api calling here
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        dispatch(setUser(res.data.data.user));
      } catch (error) {
        dispatch(setUser(null));
        console.log("Not Logged In");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, api]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <p>Loading application...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default MainRoute;
