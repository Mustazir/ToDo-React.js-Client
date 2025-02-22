import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home";
import Root from "./Root";
import AllTask from "./../../Pages/Tasks page/AllTask";
import IncompleteTask from "./../../Pages/Tasks page/IncompleteTask";
import ImportentTask from './../../Pages/Tasks page/ImportentTask';
import CompleteTask from "../../Pages/Tasks page/CompleteTask";


import Login from "../../Pages/Log/Login";
import SignUp from "../../Pages/Log/SignUP";
import UserPrivate from "../Authentication/UserPrivate";
import InProgress from "../../Pages/Tasks page/InProgress";
import AllAllTask from "../../Pages/Tasks page/AllAllTask";

export const router = createBrowserRouter([
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/signUp',
    element:<SignUp></SignUp>
  },
  
  {
    path: "/",
    element: <UserPrivate><Root></Root></UserPrivate>,
    children: [
      {
        path: "/alltask",
        element: <AllAllTask></AllAllTask>
      },
      // {
      //   path: "/alltask",
      //   element: <AllTask></AllTask>,
      // },
      {
        path: "/incompletedtask",
        element: <IncompleteTask></IncompleteTask>,
      },
      {
        path: "/completedtask",
        element: <CompleteTask></CompleteTask>,
      },
      {
        path: "/importenttask",
        element: <ImportentTask></ImportentTask>,
      },
      {
        path: "/inProgress",
        element: <InProgress></InProgress>
      },
    ],
  },
  {
    path:'/signUp',
    element :<SignUp></SignUp>
  }
  ,
  {
    path:'/logIn',
    element :<Login></Login>
  }
]);
