import React, { useState } from "react";
import Card from "../../Components/HomeComponents/Card";
import { IoMdAdd } from "react-icons/io";
import InputData from "../../Components/HomeComponents/InputData";

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");

  return (
    <div className=" flex flex-col p-5 mx-auto">
     
      <div className="flex hover:bg-green-400 cursor-pointer justify-end w-fit  m-4 text-xl border-white border rounded-full">
        <button className="cursor-pointer p-4" onClick={() => setInputDiv("fixed")}>
          <IoMdAdd />
        </button>
      </div>

      {/* Tasks & Pagination Wrapper */}
      <div className="flex flex-col flex-grow justify-between">
        {/* Task Grid */}
        <Card home="true" setInputDiv={setInputDiv} />

        {/* Input Modal */}
        <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
      </div>
    </div>
  );
};

export default AllTask;
