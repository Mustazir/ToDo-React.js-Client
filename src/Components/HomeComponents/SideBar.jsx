import React from "react";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
const SideBar = () => {
  const data = [
    {
      title: "All Task",
      icon:<CgNotes />,
      link : '/'

    },
    {
      title: "Important Task",
      icon:<CgNotes />,
      link : '/importenttask'
    },
    {
      title: "Completed Task",
      icon:<CgNotes />,
      link : '/completedtask'
    },
    {
      title: "Incompleted Task",
      icon:<CgNotes />,
      link : '/incompletedtask'
    },
  ];
  return (
    <>
      <div>
        <h1>Coder Man</h1>
        <h4>billah@gmaail.com</h4>
        <hr />
      </div>
      <div>
        {data.map((item, i) => (
          <Link to={item.link} key={i} className="flex items-center gap-2 my-2 hover:bg-gray-500">{item.icon}{item.title}</Link>
        ))}
      </div>
      <div>
        <button className="w-full bg-gray-500">Logout</button>
      </div>
    </>
  );
};

export default SideBar;
