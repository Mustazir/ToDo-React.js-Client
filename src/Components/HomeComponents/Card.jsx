import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const fetchTasks = async () => {
  const response = await axios.get("http://localhost:5000/tasks");
  return response.data;
};

const Card = ({ home, setInputDiv, filterStatus, filterImportant }) => {
  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // Fetch Tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Mutations for updating tasks
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(`http://localhost:5000/tasks/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh tasks after update
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  // Filter tasks dynamically
  let displayedTasks = tasks;
  if (filterStatus) {
    displayedTasks = displayedTasks.filter((task) => task.status === filterStatus);
  }
  if (filterImportant) {
    displayedTasks = displayedTasks.filter((task) => task.important);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {displayedTasks.map((item, i) => (
        <div key={i} className="border p-4 flex flex-col justify-between gap-3 rounded-2xl">
          {editingTask === item._id ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border p-1 rounded w-full"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-1 rounded w-full mt-2"
              ></textarea>
              <button
                onClick={() => {
                  updateTaskMutation.mutate({
                    id: item._id,
                    data: { title: editedTitle, description: editedDescription },
                  });
                  setEditingTask(null);
                }}
                className="bg-blue-500 text-white p-1 mt-2 rounded w-full"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </>
          )}

          <div className="flex items-center justify-between">
            {/* Task Status Button */}
            <button
              onClick={() => {
                const newStatus =
                  item.status === "Incomplete"
                    ? "In Progress"
                    : item.status === "In Progress"
                    ? "Completed"
                    : "Incomplete";
                updateTaskMutation.mutate({ id: item._id, data: { status: newStatus } });
              }}
              className={`p-2 rounded-2xl w-2/6 text-white ${
                item.status === "Incomplete"
                  ? "bg-gray-500"
                  : item.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-green-800"
              }`}
            >
              {item.status}
            </button>

            <div className="flex w-4/6 justify-evenly text-2xl">
              {/* Important Button */}
              <button
                onClick={() => {
                  updateTaskMutation.mutate({
                    id: item._id,
                    data: { important: !item.important },
                  });
                }}
                className={item.important ? "text-red-500" : "text-gray-500"}
              >
                <CiHeart />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => {
                  setEditingTask(item._id);
                  setEditedTitle(item.title);
                  setEditedDescription(item.description);
                }}
              >
                <FaEdit />
              </button>

              {/* Delete Button */}
              <button onClick={() => deleteTaskMutation.mutate(item._id)}>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      ))}

      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="border p-4 flex flex-col items-center gap-3 rounded-2xl justify-center"
        >
          <h3>Add More</h3>
        </button>
      )}
    </div>
  );
};

export default Card;
