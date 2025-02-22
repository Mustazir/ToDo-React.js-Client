import { useContext, useState } from "react";
import { FaEnvelope, FaGoogle, FaLock } from "react-icons/fa";
import { AuthContext } from "../../Components/Authentication/AuthProvider";
import axios from "axios";

const Login = () => {
  const { handelSignin, googleSign } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handelgoogle = () => {
    googleSign()
      .then((user2) => {
        Toast.fire({
          icon: "success",
          title: `Welcome ${user2.user.displayName}`
        });

        const newUser = { name: user2.user.displayName, email: user2.user.email };

        axios
          .post("https://todo-react-js-server.onrender.com/users", newUser)
          .then(() => console.log("Google User stored successfully"))
          .catch((err) => console.error("Error storing Google user:", err));
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.code
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
        
        // **Logged in user MongoDB তে স্টোর করবো**
        const loggedInUser = { email: result.user.email };

        axios
          .post("https://todo-react-js-server.onrender.com/users", loggedInUser)
          .then(() => console.log("Logged In User stored successfully"))
          .catch((err) => console.error("Error storing logged in user:", err));

        form.reset();
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Login
          </button>
          <div className="items-center justify-center text-center">
            <div className="flex items-center justify-between">
              <hr className="w-1/6" />
              <p>Login with social accounts</p>
              <hr className="w-1/6" />
            </div>
            <button onClick={handelgoogle}>
              <FaGoogle />
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
