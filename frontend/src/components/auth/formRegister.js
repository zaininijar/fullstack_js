import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControl from "../form/formControl";
import Input from "../form/input";
import Button from "../form/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputFile from "../form/inputFile";

const Form = (props) => {
  const [name, setName] = useState({ value: "", msgError: "" });
  const [nim, setNim] = useState({ value: "", msgError: "" });
  // const [image, setImage] = useState({ value: null, msgError: "" });
  const [username, setUsername] = useState({ value: "", msgError: "" });
  const [password, setPassword] = useState({ value: "", msgError: "" });
  const [confPassword, setConfPassword] = useState({ value: "", msgError: "" });
  const [images, setImages] = useState(null);

  const handleName = (value) => {
    if (value === "" || value.length > 30 || !new RegExp(/\D/).test(value)) {
      let message = "";
      if (value === "") {
        message = "Nama tidak boleh kosong";
      }
      if (value.length > 30) {
        message = "maksinal 30";
      }
      if (!new RegExp(/\D/).test(value)) {
        if (value === "") {
          message = "Nama tidak boleh kosong";
        } else {
          message = "Tidak boleh hanya angka";
        }
      }
      setName((prev) => ({ ...prev, msgError: message }));
    } else {
      setName({ msgError: "", value: value });
    }
  };

  const handleNim = (value) => {
    if (value === "" || value.length > 10 || new RegExp(/\D/).test(value)) {
      let message = "";
      if (value === "") {
        message = "nim kosong";
      }
      if (value.length > 10) {
        message = "maksinal 10";
      }

      if (new RegExp(/\D/).test(value)) {
        message = "Harus angka";
      }
      setNim((prev) => ({ ...prev, msgError: message }));
    } else {
      setNim({ msgError: "", value: value });
    }
  };

  const handleUsername = (value) => {
    if (
      value === "" ||
      !new RegExp(/^[a-z0-9]*$/).test(value) ||
      value === "bob"
    ) {
      let message = "";
      if (value === "") {
        message = "Username kosong";
      }

      if (!new RegExp(/^[a-z0-9]*$/).test(value)) {
        message = "Harus huruf kecil";
      }

      if (value === "bob") {
        message = "Tidak boleh hanya kata bob,";
      }

      setUsername((prev) => ({ ...prev, msgError: message }));
    } else {
      setUsername({ msgError: "", value: value });
    }
  };

  const handlePassword = (value) => {
    if (
      value === "" ||
      !new RegExp("^(?=.{8,})").test(value) ||
      !new RegExp("^(?=.*[a-z])(?=.*[A-Z])").test(value) ||
      !new RegExp("^(?=.*[0-9])").test(value) ||
      !new RegExp("^(?=.*[!@#$%^&*])").test(value)
    ) {
      let message = "";

      if (value === "") {
        message = "Password harus terisi";
      }

      if (!new RegExp("^(?=.*[0-9])").test(value)) {
        message = "Minimal 1 angka";
      }

      if (!new RegExp("^(?=.*[a-z])(?=.*[A-Z])").test(value)) {
        message = "Harus memiliki kombinasi huruf besar dan huruf kecil";
      }

      if (!new RegExp("^(?=.*[!@#$%^&*])").test(value)) {
        message = "Minimal 1 karakter spesial";
      }

      if (!new RegExp("^(?=.{8,})").test(value)) {
        message = "Minimal 8 karakter";
      }

      setPassword((prev) => ({ ...prev, msgError: message }));
    } else {
      setPassword({ msgError: "", value: value });
    }
  };

  const handleConfPassword = (value) => {
    debugger;
    if (value === "" || password.value !== value) {
      let message = "";

      if (value === "") {
        message = "Password harus terisi";
      }

      if (password !== value) {
        message = "Password dan konfirmasi password tidak sama";
      }

      setConfPassword((prev) => ({ ...prev, msgError: message }));
    } else {
      setConfPassword({ msgError: "", value: value });
    }
  };

  const showPassword = () => {
    var x = document.getElementById("password");
    var y = document.getElementById("confPassword");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  };

  const navigate = useNavigate();

  const [msg, setMsg] = useState("");

  const Register = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    debugger;
    formData.append("namaMahasiswa", name.value);
    formData.append("nim", nim.value);
    formData.append("image", images);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("confPassword", confPassword.value);

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

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="w-full my-16">
      <form onSubmit={Register} className="bg-white w-full px-24 lg:px-32">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hallo Semua!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">
          Yuk daftar akun kamu
        </p>
        <p className="text-sm font-normal text-red-600 mb-7"></p>
        <div className="mb-4">
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
              onChange={(e) => {
                handleName(e.target.value);
              }}
            />
          </FormControl>
          {name.msgError && (
            <div className="text-red-500 text-xs ml-2">{name.msgError}</div>
          )}
        </div>
        <div className="mb-4">
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
            <Input
              placeholder="NIM"
              name="nim"
              onChange={(e) => {
                handleNim(e.target.value);
              }}
            />
          </FormControl>
          {nim.msgError && (
            <div className="text-red-500 text-xs ml-2">{nim.msgError}</div>
          )}
        </div>
        <div className="mb-4">
          <InputFile setFile={setImages} />
        </div>
        <div className="mb-4">
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
              onChange={(e) => {
                handleUsername(e.target.value);
              }}
            />
          </FormControl>
          {username.msgError && (
            <div className="text-red-500 text-xs ml-2">{username.msgError}</div>
          )}
        </div>
        <div className="mb-4">
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
              id="password"
              onChange={(e) => {
                handlePassword(e.target.value);
              }}
            />
          </FormControl>
          {password.msgError && (
            <div className="text-red-500 text-xs ml-2">{password.msgError}</div>
          )}
        </div>
        <div className="mb-4">
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
              id="confPassword"
              onChange={(e) => {
                handleConfPassword(e.target.value);
              }}
            />
          </FormControl>
          {confPassword.msgError && (
            <div className="text-red-500 text-xs ml-2">
              {confPassword.msgError}
            </div>
          )}
        </div>
        <div className="flex items-center ml-2">
          <input type="checkbox" onClick={showPassword} />
          <div className="text-xs ml-2">Show Password</div>
        </div>
        <Button type="submit">Daftar</Button>
        <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
          Forgot Password ?
        </span>
      </form>
      {/* <pre>{files && JSON.stringify(files, null, 2)}</pre> */}
    </div>
  );
};

Form.propTypes = {};

export default Form;
