// import React, { useState } from "react";
// import { IoIosClose } from "react-icons/io";
// import axios from "axios"; // Import axios

// const InputData = ({ inputDiv, setInputDiv }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     if (!title || !description) {
//       alert("Please fill out both fields!");
//       return;
//     }

//     const newTask = { title, description, status: "incomplete" }; // Added status field

//     try {
//       const response = await axios.post("http://localhost:5000/tasks", newTask, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 200) {
//         alert("Task added successfully!");
//         setTitle(""); // Reset title field
//         setDescription(""); // Reset description field
//         setInputDiv("hidden"); // Hide the modal
//       } else {
//         alert(`Error: ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//       alert("Failed to add task. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className={`${inputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
//       <div className={`${inputDiv} fixed top-0 flex items-center justify-center h-full w-full left-0`}>
//         <div className="w-3/6 bg-gray-800 p-4 rounded">
//           <div className="items-end flex justify-end text-4xl">
//             <button onClick={() => setInputDiv("hidden")} className="hover:bg-red-600 mb-2">
//               <IoIosClose />
//             </button>
//           </div>
//           <input
//             type="text"
//             placeholder="Title"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="px-3 py-2 rounded w-full bg-white text-black"
//           />
//           <textarea
//             name="description"
//             placeholder="Enter the Description ..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             cols="30"
//             rows="5"
//             className="bg-gray-500 w-full my-2 rounded p-4"
//           ></textarea>
//           <button onClick={handleSubmit} className="px-3 py-2 bg-blue-400 text-black text-2xl font-semibold">
//             Submit
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InputData;
