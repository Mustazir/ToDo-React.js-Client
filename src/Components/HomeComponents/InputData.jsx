import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const InputData = ({ inputDiv, setInputDiv }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async (newTask) =>
      axios.post("https://todo-react-js-server.onrender.com/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setTitle("");
      setDescription("");
      setInputDiv("hidden");
    },
  });

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill out both fields!");
      return;
    }
    addTaskMutation.mutate({ title, description, status: "Incomplete" });
  };

  return (
    <>
      <div
        className={`${inputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} fixed top-0 flex items-center justify-center h-full w-full left-0`}
      >
        <div className="w-3/6 bg-gray-800 p-4 rounded">
          <div className="items-end flex justify-end text-4xl">
            <button
              onClick={() => setInputDiv("hidden")}
              className="hover:bg-red-600 mb-2"
            >
              <IoIosClose  className="cursor-pointer"/>
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setTitle(e.target.value);
              }
            }}
            className="px-3 py-2 rounded w-full bg-white text-black"
          />
          <textarea
            maxlength="200"
            placeholder="Enter the Description ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-500 w-full my-2 rounded p-4"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-3 py-2 bg-blue-400 text-black text-2xl font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
