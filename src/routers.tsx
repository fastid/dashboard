import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import SignIn from "./layers/SignIn";
import SignUp from "./layers/SignUp";
import Dashboard from "./layers/Dashboard";
import AdminSignUp from "./layers/AdminSignUp";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
  },
  {
    path: '/signin/',
    element: <SignIn/>,
  },
  {
    path: '/signup/',
    element: <SignUp/>,
  },
  {
    path: '/admin/signup/',
    element: <AdminSignUp/>,
  },
]);
