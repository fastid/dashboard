import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import SignIn from "./layers/SignIn";
import SignUp from "./layers/SignUp";
import Dashboard from "./layers/Dashboard";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    // loader: async () => {
    //   const value = localStorage.getItem('lang')
    //   if (value) {
    //     console.log(value)
    //   }
    //   return redirect('/signin/')
    // },
  },
  {
    path: '/signin/',
    element: <SignIn />,
  },
  {
    path: '/signup/',
    element: <SignUp />,
  },
]);
