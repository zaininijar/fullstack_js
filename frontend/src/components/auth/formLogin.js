import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FormControl from "../form/formControl";
import Input from "../form/input";
import Button from "../form/button";

const FormLogin = (props) => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const Auth = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/login", form).then((e) => {
        navigate("/dashboard");
      });
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={Auth} className="bg-white">
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
      <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
      <p className="text-sm font-normal text-red-600 mb-7">{msg}</p>
      <FormControl>
        <svg
          className="opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <Input
          placeholder="Username"
          name="username"
          onChange={handleChangeInput}
        />
      </FormControl>
      <FormControl>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clip-rule="evenodd"
          />
        </svg>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChangeInput}
        />
      </FormControl>
      <Button type="submit">Masuk</Button>
      <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
        Forgot Password ?
      </span>
    </form>
  );
};

FormLogin.propTypes = {};

export default FormLogin;
