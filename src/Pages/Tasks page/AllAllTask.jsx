import React, { useState } from "react";
import CompleteTask from "./CompleteTask";
import IncompleteTask from "./IncompleteTask";
import ImportentTask from "./ImportentTask";
import InProgress from "./InProgress";
import InputData from "../../Components/HomeComponents/InputData";
import { IoMdAdd } from "react-icons/io";
import Card from "../../Components/HomeComponents/Card";

const AllAllTask = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
  return (
    <>
      <div >
        <div className=" flex flex-col p-5 mx-auto">
          <div className="flex hover:bg-green-400 cursor-pointer justify-end w-fit  m-4 text-xl border-white border rounded-full">
            <button
              className="cursor-pointer p-4"
              onClick={() => setInputDiv("fixed")}
            >
              <IoMdAdd />
            </button>
          </div>

          {/* Tasks & Pagination Wrapper */}
          <div className="flex flex-col flex-grow justify-between">
            {/* Task Grid */}
            

            {/* Input Modal */}
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
          </div>
        </div>
      </div>
      <div className=" lg:flex gap-2 mx-auto lg:mt-5">
        <IncompleteTask></IncompleteTask>
        <InProgress></InProgress>
        <CompleteTask> </CompleteTask>
        <ImportentTask></ImportentTask>
      </div>
    </>
  );
};

export default AllAllTask;
