import React, { useState } from "react";
import Card from "../../Components/HomeComponents/Card";
import { IoMdAdd } from "react-icons/io";
import InputData from "../../Components/HomeComponents/InputData";

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");

  return (
    <>
      <div className="flex hover:bg-green-400 justify-end w-fit p-4 text-5xl border-white border rounded">
        <button onClick={() => setInputDiv("fixed")}>
          <IoMdAdd />
        </button>
      </div>
      <Card home="true" setInputDiv={setInputDiv} />
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  );
};

export default AllTask;
