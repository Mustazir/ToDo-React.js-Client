import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home";
import Root from "./Root";
import AllTask from "./../../Pages/Tasks page/AllTask";
import IncompleteTask from "./../../Pages/Tasks page/IncompleteTask";
import ImportentTask from './../../Pages/Tasks page/ImportentTask';
import CompleteTask from "../../Pages/Tasks page/CompleteTask";

import SignUP from "../../Pages/Log/SignUP";
import Login from "../../Pages/Log/Login";
CompleteTask
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <AllTask></AllTask>,
      },
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
    ],
  },
  {
    path:'/signUp',
    element :<SignUP></SignUP>
  }
  ,
  {
    path:'/logIn',
    element :<Login></Login>
  }
]);
