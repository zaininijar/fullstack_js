import React from "react";
import { Link } from "react-router-dom";
import FormLogin from "../../components/auth/formLogin";

const Login = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 hidden px-16 md:flex bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Lorem ipsum
          </h1>
          <p className="text-white mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit natus.
          </p>
          <Link
            to="/register"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 text-center hover:bg-grey-200"
          >
            Registrasi
          </Link>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
