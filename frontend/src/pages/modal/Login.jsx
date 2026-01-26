import React, { useEffect, useRef } from "react";
import { useLoginModal } from "../../context/LoginModal";
import axios from "axios";

const Login = () => {
  const { isLoginModalOpen, setLoginModalOpen } = useLoginModal();
  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/");
      }

      setLoginModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        className=" fixed inset-0 z-50  flex justify-center items-center "
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={() => setLoginModalOpen(false)}
      >
        <div
          className="bg-white p-10 md:p-20  w-full h-auto max-w-xs rounded-2xl  md:max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className="absolute top-2 right-6  md:top-4 md:right-10 cursor-pointer font-bold text-black"
            onClick={() => setLoginModalOpen(false)}
          >
            X
          </p>

          <form action="" onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              className="px-4 py-2 w-full border-2 border-gray-200 hover:border-gray-400 outline-none"
              placeholder="Enter email here"
            />

            <input
              type="text"
              className="px-4 py-2 w-full  border-2 border-gray-200 hover:border-gray-400 outline-none"
              placeholder="Enter password here"
            />

            <button className="px-3 py-2 w-full bg-blue-400 hover:bg-blue-500 ">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
