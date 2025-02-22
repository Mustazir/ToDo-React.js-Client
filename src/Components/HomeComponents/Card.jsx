import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const Card = ({ home, setInputDiv }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Function to toggle task status (Incomplete -> In Progress -> Completed)
  const toggleStatus = async (id, currentStatus) => {
    let newStatus =
      currentStatus === "Incomplete"
        ? "In Progress"
        : currentStatus === "In Progress"
        ? "Completed"
        : "Incomplete";

    await axios.put(`http://localhost:5000/tasks/${id}`, { status: newStatus });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Function to toggle important status
  const toggleImportant = async (id, isImportant) => {
    const newImportant = !isImportant;
    await axios.put(`http://localhost:5000/tasks/${id}`, { important: newImportant });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, important: newImportant } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  // Function to handle edit
  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  // Function to update the task
  const updateTask = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      title: editedTitle,
      description: editedDescription,
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, title: editedTitle, description: editedDescription } : task
      )
    );

    setEditingTask(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {tasks.map((item, i) => (
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
                onClick={() => updateTask(item._id)}
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
              onClick={() => toggleStatus(item._id, item.status)}
              className={`${
                item.status === "Incomplete"
                  ? "bg-gray-500"
                  : item.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-green-800"
              } p-2 rounded-2xl w-2/6 text-white`}
            >
              {item.status}
            </button>

            <div className="flex w-4/6 justify-evenly text-2xl">
              {/* Important Button */}
              <button
                onClick={() => toggleImportant(item._id, item.important)}
                className={item.important ? "text-red-500" : "text-gray-500"}
              >
                <CiHeart />
              </button>

              {/* Edit Button */}
              <button onClick={() => handleEditClick(item)}>
                <FaEdit />
              </button>

              {/* Delete Button */}
              <button onClick={() => deleteTask(item._id)}>
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
