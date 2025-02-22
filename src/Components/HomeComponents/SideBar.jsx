import React from "react";
import { CgNotes } from "react-icons/cg";
const SideBar = () => {
  const data = [
    {
      title: "All Task",
      icon:<CgNotes />

    },
    {
      title: "Important Task",
      icon:<CgNotes />
    },
    {
      title: "Completed Task",
      icon:<CgNotes />
    },
    {
      title: "Incompleted Task",
      icon:<CgNotes />
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
          <div className="flex items-center gap-2 my-2">{item.icon}{item.title}</div>
        ))}
      </div>
      <div>
        <button className="w-full bg-gray-500">Logout</button>
      </div>
    </>
  );
};

export default SideBar;
