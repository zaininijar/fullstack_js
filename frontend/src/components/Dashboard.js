import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUsername(decoded.userName);
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

        setUsername(decoded.userName);
        setExpire(decoded.exp);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data);
  };

  return (
    <div className="container mt-5">
      <div>Welcome Back: {username}</div>
      <button onClick={getUsers} className="button is-info mt-4">
        Get Users
      </button>
      <div className="columns is-gapless box mt-4">
        <div className="column">
          <table className="table is-stripped is-fullwidth">
            <thead>
              <tr>
                <th>
                  <abbr title="Position">No</abbr>
                </th>
                <th>Username</th>
                <th>
                  <abbr title="Played">Email</abbr>
                </th>
                <th>
                  <abbr title="Won">Joining</abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Dashboard;
