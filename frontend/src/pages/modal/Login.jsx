// import React, { useEffect, useState } from "react";
// import { useLoginModal } from "../../context/LoginModal";
// import axios from "axios";
// import { useDispatch } from "react-redux";

// import { useNavigate } from "react-router-dom";
// import { loginSuccess } from "../../redux/authSlice";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const { isLoginModalOpen, setLoginModalOpen } = useLoginModal();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     if (isLoginModalOpen) {
//       document.body.classList.add("no-scroll");
//     } else {
//       document.body.classList.remove("no-scroll");
//     }

//     return () => document.body.classList.remove("no-scroll");
//   }, [isLoginModalOpen]);

//   if (!isLoginModalOpen) return null;

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:8080/api/users/login",
//   //       formData,
//   //     );

//   //     if (response.status === 200 || response.status === 201) {
//   //       dispatch(loginSuccess(response.data.token)); // save token in Redux
//   //       setLoginModalOpen(false); // just close modal, stay on current page
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/users/login",
//       formData
//     );

//     if (response.status === 200 || response.status === 201) {
//       const { token, user } = response.data;

//       dispatch(
//         loginSuccess({
//           token: token,
//           role: user.role,
//         })
//       );

//       setLoginModalOpen(false);

//       // 🔥 ROLE BASED REDIRECT
//       if (user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/"); // normal user
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
//   return (
//     <div
//       className="fixed inset-0 z-50 flex justify-center items-center"
//       style={{ background: "rgba(0,0,0,0.5)" }}
//       onClick={() => setLoginModalOpen(false)}
//     >
//       <div
//         className="bg-white p-10 md:p-20 w-full h-auto max-w-xs rounded-2xl md:max-w-md relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <p
//           className="absolute top-2 right-6 md:top-4 md:right-10 cursor-pointer font-bold text-black"
//           onClick={() => setLoginModalOpen(false)}
//         >
//           X
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="text"
//             className="px-4 py-2 w-full border-2 border-gray-200 hover:border-gray-400 outline-none"
//             placeholder="Enter email here"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             className="px-4 py-2 w-full border-2 border-gray-200 hover:border-gray-400 outline-none"
//             placeholder="Enter password here"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <button className="px-3 py-2 w-full bg-blue-400 hover:bg-blue-500">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useEffect, useState } from "react";
import { useLoginModal } from "../../context/LoginModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoginModalOpen, setLoginModalOpen } = useLoginModal();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;

        dispatch(loginSuccess({ token, role: user.role }));
        setLoginModalOpen(false);

        // if (user.role === "admin") navigate("/admin/dashboard");
        // else navigate("/");

        if (user.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate(location.pathname);
}
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/users", {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user",
      });

      alert("Registration Successful!");
      setIsRegister(false);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
      onClick={() => setLoginModalOpen(false)}
    >
      <div
        className="bg-white p-8 md:p-12 w-full max-w-md rounded-2xl relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="absolute top-4 right-6 cursor-pointer font-bold text-black"
          onClick={() => setLoginModalOpen(false)}
        >
          ✕
        </p>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-black outline-none"
            required
          />

          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="px-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {/* Toggle Section */}
        <div className="text-center mt-6 text-sm">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegister(false)}
                className="font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsRegister(true)}
                className="font-semibold cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;