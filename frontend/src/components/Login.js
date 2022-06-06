import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-desktop">
              <form onSubmit={Auth} className="box p-6">
                <h1 className="is-size-5 has-text-centered has-text-weight-semibold mb-5">
                  Login Mahasiswa
                </h1>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-info"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                      </svg>
                    </span>
                    <span className="icon is-small is-right"></span>
                  </div>
                </div>
                <div className="field mt-4">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input is-info"
                      type="password"
                      placeholder="username"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                      </svg>
                    </span>
                    <span className="icon is-small is-right"></span>
                  </div>
                  <p className="help is-danger">{msg}</p>
                </div>
                <div className="is-flex mt-5">
                  <button className="button mr-3 px-8 is-info is-fullwidth">
                    Masuk
                  </button>
                  <Link
                    to="/register"
                    className="button has-text-weight-semibold px-8 is-info is-light is-border is-fullwidth"
                  >
                    Daftar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
