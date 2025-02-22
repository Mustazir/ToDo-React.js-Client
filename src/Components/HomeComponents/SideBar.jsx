import React, { useContext } from "react";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import { MdLabelImportantOutline } from "react-icons/md";
import { MdOutlineSmsFailed } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";

const SideBar = () => {
  const { user, loading, logout } = useContext(AuthContext);

  const handelLogout = () => {
    logout()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: `Bye See You Again`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data = [
    {
      title: "All Task",
      icon: <CgNotes />,
      link: "alltask",
    },
    {
      title: "Important Task",
      icon: <MdLabelImportantOutline />,
      link: "/importenttask",
    },
    {
      title: "Completed Task",
      icon: <IoCheckmarkDone />,
      link: "/completedtask",
    },
    {
      title: "In Progress",
      icon: <GrInProgress />,
      link: "/inProgress",
    },
    {
      title: "Incompleted Task",
      icon: <MdOutlineSmsFailed />,
      link: "/incompletedtask",
    },
  ];

  return (
    <div className="h-screen sticky top-0 bg-color2 text-white hidden  lg:flex flex-col justify-between py-5 dark:bg-gray-950 dark:text-white">
      <div className="flex flex-col px-3 ">
        <div className="divider"></div>

        <ul className="menu w-full text-white p-0 [&_li>*]:rounded-none">
          {data.map((item, i) => (
            <li key={i}>
              <Link
                to={item.link}
                className="flex items-center gap-2 my-2 hover:bg-gray-500"
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="menu px-3 w-full text-white p-0 [&_li>*]:rounded-none">
        <div className="divider"></div>
        {loading ? (
          <div className="flex py-2 w-[247px] h-12">
            <span className="loading loading-bars loading-md"></span>
          </div>
        ) : user ? (
          <div className="flex w-[247px] py-6 gap-4">
            <div>
              
              <h1>{user.email || "No Email"}</h1>
            </div>
          </div>
        ) : null}
        <div className="divider"></div>
        {user ? (
          <li
            onClick={handelLogout}
            className="hover:bg-color1 hover:text-white active:bg-color1"
          >
            <Link>Log Out</Link>
          </li>
        ) : (
          <li className="hover:bg-color1 hover:text-white active:bg-color1">
            <Link to={"/login"}>Log In</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
