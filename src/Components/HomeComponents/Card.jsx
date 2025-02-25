import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const fetchTasks = async () => {
  const response = await axios.get(
    "https://todo-react-js-server.onrender.com/tasks"
  );
  return response.data;
};

const Modal = ({ isOpen, onClose, title, description, onSave, isEditing }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  // Sync state with props whenever the modal opens or the props change
  useEffect(() => {
    if (isOpen) {
      setEditedTitle(title);
      setEditedDescription(description);
    }
  }, [isOpen, title, description]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl items-center flex justify-center lg:w-2/5 mx-auto lg:h-3/4 my-auto">
        <div className="bg-white text-black p-6 rounded-lg w-96 shadow-lg">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border p-1 rounded w-full mb-4"
                placeholder="Title"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-1 rounded w-full mb-4"
                placeholder="Description"
                maxLength="250"
              ></textarea>
              <button
                onClick={() => {
                  onSave(editedTitle, editedDescription);
                  onClose();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p className="mb-6">{description}</p>
            </>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({ filterStatus, filterImportant }) => {
  const queryClient = useQueryClient();
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    description: "",
    taskId: null,
    isEditing: false,
  });

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axios.put(
        `https://todo-react-js-server.onrender.com/tasks/${id}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(
        `https://todo-react-js-server.onrender.com/tasks/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  let displayedTasks = tasks;
  if (filterStatus) {
    displayedTasks = displayedTasks.filter(
      (task) => task.status === filterStatus
    );
  }
  if (filterImportant) {
    displayedTasks = displayedTasks.filter((task) => task.important);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col mx-auto flex-grow">
      <div className="flex flex-col gap-4 p-6 flex-grow">
        {displayedTasks.map((item) => (
          <div
            key={item._id}
            className="border p-4 flex flex-col w-80 h-48 gap-3 rounded-2xl"
          >
            <h3>{item.title}</h3>
            <div className="flex justify-between">
              <p>
                Date: {new Date(item.createdAt).toISOString().split("T")[0]}
              </p>
              <p>
                Time:{" "}
                {new Date(item.createdAt)
                  .toTimeString()
                  .split(" ")[0]
                  .slice(0, 5)}
              </p>
            </div>
            <button
              onClick={() =>
                setModalData({
                  isOpen: true,
                  title: item.title,
                  description: item.description,
                  taskId: null,
                  isEditing: false,
                })
              }
              className="cursor-pointer bg-blue-500 text-white p-1 rounded w-full"
            >
              Details
            </button>

            <div className="flex items-center justify-between bg-">
              <button
                onClick={() => {
                  const newStatus =
                    item.status === "Incomplete"
                      ? "In Progress"
                      : item.status === "In Progress"
                      ? "Completed"
                      : "Incomplete";
                  updateTaskMutation.mutate({
                    id: item._id,
                    data: { status: newStatus },
                  });
                }}
                className={`cursor-pointer p-2 rounded-2xl w-2/6 text-white ${
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
                <button
                  onClick={() => {
                    updateTaskMutation.mutate({
                      id: item._id,
                      data: { important: !item.important },
                    });
                  }}
                  className={item.important ? "text-red-500" : "text-gray-500"}
                >
                  <CiHeart className="cursor-pointer" />
                </button>

                <button
                  onClick={() =>
                    setModalData({
                      isOpen: true,
                      title: item.title,
                      description: item.description,
                      taskId: item._id,
                      isEditing: true,
                    })
                  }
                >
                  <FaEdit className="cursor-pointer" />
                </button>

                <button onClick={() => deleteTaskMutation.mutate(item._id)}>
                  <MdDeleteOutline className="cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalData.isOpen}
        onClose={() =>
          setModalData({
            isOpen: false,
            title: "",
            description: "",
            taskId: null,
            isEditing: false,
          })
        }
        title={modalData.title}
        description={modalData.description}
        isEditing={modalData.isEditing}
        onSave={(editedTitle, editedDescription) => {
          if (modalData.taskId) {
            updateTaskMutation.mutate({
              id: modalData.taskId,
              data: { title: editedTitle, description: editedDescription },
            });
          }
        }}
      />
    </div>
  );
};

export default Card;
