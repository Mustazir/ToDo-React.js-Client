import { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Components/Authentication/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext); // Assuming a signup function exists
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Define Toast for SweetAlert2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log("User Signed Up:", result.user);
        form.reset();
        navigate('/alltask');
        axios
          .post("https://todo-react-js-server.onrender.com/users", newUser)
          .then(() => console.log("User stored successfully"))
          .catch((err) => console.error("Error storing user:", err));
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
