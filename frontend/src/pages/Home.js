import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [namaMahasiswa, setNamaMahasiswa] = useState("");
  const [nim, setNim] = useState("");
  const [fotoMahasiswa, setFotoMahasiswa] = useState("");
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setNamaMahasiswa(decoded.namaMahasiswa);
      setNim(decoded.nim);
      setFotoMahasiswa(decoded.fotoMahasiswa);
      setUserName(decoded.userName);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();

      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;

        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);

        setNamaMahasiswa(decoded.namaMahasiswa);
        setNim(decoded.nim);
        setFotoMahasiswa(decoded.fotoMahasiswa);
        setUserName(decoded.userName);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="relative text-gray-800 bg-gray-50">
      <Navbar isActive="home" />
      <section className="flex flex-col items-center justify-center h-screen  -my-20 md:-mt-48 px-8">
        <div className="flex flex-col items-center justify-center text-center h-screen-half">
          <img
            className="md:hidden object-cover w-15 h-40 rounded-full mb-5 ring-2 ring-gray-500/50 ring-offset-[10px]"
            src={fotoMahasiswa}
            alt="Your Name Here"
          />
          <h1 className="text-5xl sm:text-6xl lg:text-9xl">{namaMahasiswa}</h1>
          <h2 className="font-light text-4xl sm:text-5xl lg:text-6xl mb-4">
            {userName}
          </h2>
          <h3 className="font-bold text-2xl md:text-4xl">{nim}</h3>
        </div>
      </section>
      <section className="flex items-center justify-center px-8 mb-20 tracking-wider">
        <img
          className="hidden md:block object-cover w-1/4 h-screen rounded-full ring-2 ring-gray-500/50 ring-offset-[30px]"
          src={fotoMahasiswa}
          alt="Your Name Here"
        />
      </section>
      <hr className="border-gray-400 mx-44" />
      <footer className="absolute w-full h-36 bottom-0 p-8 px-16 bg-gray-800 text-gray-50">
        <p className="text-2xl">Thank you for checking out my portfolio</p>
        <a className="text-lg" href="mailto:zaininijar7610@gmail.com">
          zaininijar7610@gmail.com
        </a>
      </footer>
      <div className="h-80"></div>
    </div>
  );
};

export default Home;
