import * as React from "react"
import {createBrowserRouter} from "react-router-dom"
import {SignIn} from "./layers/SignIn"
import SignUp from "./layers/SignUp"
import {Dashboard} from "./layers/Dashboard"
import {ChangeLanguage} from "./layers/ChangeLanguage"
import {CheckAuth} from "./components/CheckAuth"
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
  },
  {
    path: '/change_language/',
    element: (
      <>
        <CheckAuth/>
        <ChangeLanguage/>
      </>
    ),
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
