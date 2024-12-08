import LoginPage from "@/pages/login";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPage = React.lazy()=> import("@/pages/login")
const Dashboard = React.lazy()=> import("@/pages/dashboard")
const CategoryManager = React.lazy()=> import("@/pages/categoryManager")
const ProductManager = React.lazy()=> import("@/pages/productManager")

const LazyLoad
const routers = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
