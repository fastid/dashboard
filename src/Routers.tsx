import * as React from "react"
import {createBrowserRouter} from "react-router-dom"
import {SignIn} from "./layers/SignIn"
import SignUp from "./layers/SignUp"
import {Dashboard} from "./layers/Dashboard"
import {Language} from "./layers/Language"
import {CheckAuth, CheckAuthRouter} from "./components/CheckAuth"
import {Error404} from "./layers/Error";


const Routers = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <CheckAuth/>
        <Dashboard/>
      </>
    ),
    loader: CheckAuthRouter,
  },
  {
    path: '/language/',
    element: (
      <>
        <CheckAuth/>
        <Language/>
      </>
    ),
    loader: CheckAuthRouter,
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
    path: '*',
    element: <Error404/>,
  },
])

export default Routers
