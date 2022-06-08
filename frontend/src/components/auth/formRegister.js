import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "../form/formControl";
import Input from "../form/input";
import Button from "../form/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
  const [form, setForm] = useState({
    namaMahasiswa: "",
    nim: "",
    fotoMahasiswa: {},
    username: "",
    password: "",
    confPassword: "",
  });

  const navigate = useNavigate();

  const [msg, setMsg] = useState("");

  const handleChangeInput = (e) => {
    if (typeof e.target.files[0] !== "undefined") {
      return setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Register = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("namaMahasiswa", form.namaMahasiswa);
    formData.append("nim", form.nim);
    formData.append("image", form.fotoMahasiswa);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("confPassword", form.confPassword);

    try {
      const response = await axios.post(
        "http://localhost:5000/mahasiswa",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <form onSubmit={Register} className="bg-white">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
        <p className="text-sm font-normal text-red-600 mb-7"></p>
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
            placeholder="Nama Lengkap"
            name="namaMahasiswa"
            onChange={handleChangeInput}
          />
        </FormControl>
        <FormControl>
          <svg
            className="opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z" />
          </svg>
          <Input placeholder="NIM" name="nim" onChange={handleChangeInput} />
        </FormControl>
        <FormControl>
          <svg
            class="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <Input
            type="file"
            placeholder="Foto"
            name="fotoMahasiswa"
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
            placeholder="Konfirmasi Password"
            name="confPassword"
            type="password"
            onChange={handleChangeInput}
          />
        </FormControl>
        <Button type="submit">Daftar</Button>
        <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
          Forgot Password ?
        </span>
      </form>
      <pre>{JSON.stringify(msg, null, 2)}</pre>
    </div>
  );
};

Form.propTypes = {};

export default Form;
