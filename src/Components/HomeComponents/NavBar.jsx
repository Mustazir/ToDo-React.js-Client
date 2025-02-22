import React, { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';
import { Link } from 'react-router-dom';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";

import { MdOutlineSmsFailed } from "react-icons/md";

const NavBar = () => {
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
            link: "/alltask",
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
        <div className="sticky lg:hidden items-center top-0 bg-color2 text-white flex py-5 dark:bg-gray-950 dark:text-white">
            <div className="flex flex-1 px-3">
                <ul className="menu w-full flex gap-5 text-white p-0 [&_li>*]:rounded-none">
                    {data.map((item, i) => (
                        <li key={i}>
                            <Link to={item.link} className="flex  items-center gap-2 my-2 hover:bg-gray-500 " >
                                <div className='text-xl border p-2 rounded-sm mr-2 '>
                                {item.icon}
                                </div>
                                <div className='hidden md:flex'>
                                {item.title}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ml-auto px-3">
                <ul className="justify-end menu w-full text-white p-0 [&_li>*]:rounded-none">
                    {user ? (
                        <li onClick={handelLogout} className="hover:bg-color1 hover:text-white ">
                            <Link>Log Out</Link>
                        </li>
                    ) : (
                        <li className="hover:bg-color1 hover:text-white ">
                            <Link to={"/login"}>Log In</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
