import { useContext, useState } from "react";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import { AuthContext } from "../../Components/Authentication/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { handelSignin, googleSign } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Fixed variable name

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
  const fillCredentials = (email, password) => {
    document.querySelector('input[name="email"]').value = email;
    document.querySelector('input[name="password"]').value = password;
};

  const handelgoogle = () => {
    googleSign()
      .then((user2) => {
        Toast.fire({
          icon: "success",
          title: `Welcome ${user2.user.displayName}`,
        });

        const newUser = {
          name: user2.user.displayName,
          email: user2.user.email,
        };

        navigate('/alltask'); // ✅ Fixed navigation variable

        axios
          .post("https://todo-react-js-server.onrender.com/users", newUser)
          .then(() => console.log("User stored successfully"))
          .catch((err) => console.error("Error storing user:", err));
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.code,
        });
        console.log(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handelSignin(email, password)
      .then((result) => {
        console.log("User Logged In:", result.user);
        form.reset();
        navigate('/alltask'); // ✅ Navigate to '/alltask' after login
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* ✅ FIXED: Removed <Link> around the button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Login
          </button>
          <button type="button" onClick={() => fillCredentials('foradmin@gmail.com', '123456789@Aa')} className="block w-full p-2 bg-blue-500 text-white rounded-md">Dummy User</button>

          {/* Sign Up Button */}
          

          <div className="items-center justify-center text-center">
            <div className="flex items-center justify-between">
              <hr className="w-1/6" />
              <p>Login with social accounts</p>
              <hr className="w-1/6" />
            </div>
            <button onClick={handelgoogle} className="mt-2 text-blue-600 hover:underline flex items-center gap-2">
              <FaGoogle /> Sign in with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
