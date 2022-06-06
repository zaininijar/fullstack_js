import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [namaMahasiswa, setNamaMahasiswa] = useState("");
  const [nim, setNim] = useState("");
  const [fotoMahasiswa, setFotoMahasiswa] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgVal, setMsgVal] = useState({});
  const [errorVal, setErrorVal] = useState(null);

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("nama_mahasiswa", namaMahasiswa);
    formData.append("nim", nim);
    formData.append("image", fotoMahasiswa);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confPassword", confPassword);

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

  const namaMahasiswaVal = () => {
    if (!namaMahasiswa) {
      setMsgVal({ namaMahasiswa: "Nama Tidak Boleh Kosong" });
    } else if (!isNaN(namaMahasiswa)) {
      setMsgVal({ namaMahasiswa: "Tidak boleh Hanya Angka" });
    } else if (namaMahasiswa.length > 30) {
      setMsgVal({ namaMahasiswa: "Tidak boleh lebih dari 30 karakter" });
    } else if (namaMahasiswa.length <= 3) {
      setMsgVal({ namaMahasiswa: "Terlalu Pendek" });
    } else {
      setMsgVal({ namaMahasiswa: "" });
    }

    if (msg.nama_mahasiswa) {
      msg.nama_mahasiswa = "";
    }
  };

  const nimVal = () => {
    if (!nim) {
      setMsgVal({ nim: "NIM Tidak Boleh Kosong" });
    } else {
      if (isNaN(nim)) {
        setMsgVal({ nim: "Hanya angka yang bisa di inputkan" });
      } else if (nim.length > 10) {
        setMsgVal({ nim: "Tidak boleh lebih dari 10 angka" });
      } else {
        setMsgVal({ nim: "" });
      }
    }

    if (msg.nama_mahasiswa) {
      msg.nim = "";
    }
  };

  const fotoMahasiswaVal = (e) => {
    setFotoMahasiswa(e.target.files[0]);

    if (!e.target.files[0]) {
      setMsgVal({ fotoMahasiswa: "Foto tidak boleh kosong" });
    }

    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
      setMsgVal({ fotoMahasiswa: "Masukkan foto yang valid." });
    }

    if (e.target.files[0].size > 500000) {
      setMsgVal({ fotoMahasiswa: "Foto tidak boleh lebih dari 500KB" });
    }

    if (msg.nama_mahasiswa) {
      msg.foto_mahasiswa = "";
    }
  };

  const usernameVal = () => {
    if (!username) {
      setMsgVal({ username: "Username tidak boleh kosong" });
    } else if (username == str.toUpperCase()) {
      setMsgVal({ username: "Username tidak boleh huruf kapital" });
    } else {
      setMsgVal({ username: "" });
    }

    if (msg.nama_mahasiswa) {
      msg.username = "";
    }
  };

  const passwordVal = () => {
    if (!password) {
      setMsgVal({ password: "Password Tidak Boleh Kosong" });
    } else {
      setMsgVal({ password: "" });
    }

    if (msg.nama_mahasiswa) {
      msg.password = "";
    }
  };

  const confPasswordVal = () => {
    if (confPassword == "") {
      setMsgVal({ confPassword: "confPassword Tidak Boleh Kosong" });
    } else {
      setMsgVal({ confPassword: "" });
    }

    if (password !== confPassword) {
      setMsgVal({
        confPassword: "Password dan konfirmasi password tidak sama",
      });
    }
    if (msg.nama_mahasiswa) {
      msg.confPassword = "";
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-desktop">
              <form onSubmit={Register} className="box p-6">
                <h1 className="is-size-5 has-text-centered has-text-weight-semibold mb-5">
                  Daftar Mahasiswa
                </h1>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={
                        "input " +
                        (msgVal.namaMahasiswa ? "is-danger" : "is-info")
                      }
                      type="text"
                      placeholder="Nama Lengkap"
                      value={namaMahasiswa}
                      onChange={(e) => {
                        setNamaMahasiswa(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        namaMahasiswaVal();
                      }}
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
                    <p className="help is-danger">{msgVal.namaMahasiswa}</p>
                    <p className="help is-danger">{msg.nama_mahasiswa}</p>
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      id="nim"
                      className={
                        "input " + (msgVal.nim ? "is-danger" : "is-info")
                      }
                      type="text"
                      placeholder="NIM"
                      value={nim}
                      onChange={(e) => {
                        setNim(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        nimVal();
                      }}
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
                    <p className="help is-danger">{msgVal.nim}</p>
                    <p className="help is-danger">{msg.nim}</p>
                  </div>
                </div>
                <div className="field">
                  {fotoMahasiswa && fotoMahasiswa.type && (
                    <div>
                      <img
                        alt="not fount"
                        width={"250px"}
                        src={URL.createObjectURL(fotoMahasiswa)}
                      />
                      <br />
                      <button
                        onClick={() => {
                          setFotoMahasiswa(null);
                          fotoMahasiswaVal();
                        }}
                      >
                        Remove
                      </button>
                      <br />
                    </div>
                  )}
                  <div className="file is-fullwidth is-info has-name">
                    <label className="file-label">
                      <input
                        className={
                          "file-input " +
                          (msgVal.fotoMahasiswa ? "is-danger" : "is-info")
                        }
                        type="file"
                        onInput={(e) => {
                          fotoMahasiswaVal(e);
                        }}
                      />
                      <span className="file-cta">
                        <span className="file-icon is-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13,2.03C17.73,2.5 21.5,6.25 21.95,11C22.5,16.5 18.5,21.38 13,21.93V19.93C16.64,19.5 19.5,16.61 19.96,12.97C20.5,8.58 17.39,4.59 13,4.05V2.05L13,2.03M11,2.06V4.06C9.57,4.26 8.22,4.84 7.1,5.74L5.67,4.26C7.19,3 9.05,2.25 11,2.06M4.26,5.67L5.69,7.1C4.8,8.23 4.24,9.58 4.05,11H2.05C2.25,9.04 3,7.19 4.26,5.67M2.06,13H4.06C4.24,14.42 4.81,15.77 5.69,16.9L4.27,18.33C3.03,16.81 2.26,14.96 2.06,13M7.1,18.37C8.23,19.25 9.58,19.82 11,20V22C9.04,21.79 7.18,21 5.67,19.74L7.1,18.37M12,7.5L7.5,12H11V16H13V12H16.5L12,7.5Z" />
                          </svg>
                        </span>
                        <span className="file-label">Brows File</span>
                      </span>
                      <span className="file-name">
                        {fotoMahasiswa &&
                          fotoMahasiswa.name + "(" + fotoMahasiswa.size + ")"}
                      </span>
                    </label>
                  </div>
                  <p className="help is-danger">{msgVal.fotoMahasiswa}</p>
                  <p className="help is-danger">{msg.foto_mahasiswa}</p>
                </div>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={
                        "input " + (msgVal.username ? "is-danger" : "is-info")
                      }
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        usernameVal();
                      }}
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
                    <p className="help is-danger">{msgVal.username}</p>
                    <p className="help is-danger">{msg.username}</p>
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={
                        "input " + (msgVal.password ? "is-danger" : "is-info")
                      }
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        passwordVal();
                      }}
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
                    <p className="help is-danger">{msgVal.password}</p>
                    <p className="help is-danger">{msg.password}</p>
                    <p className="help is-danger">{msg.passwordMatch}</p>
                  </div>
                </div>
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className={
                        "input " +
                        (msgVal.confPassword ? "is-danger" : "is-info")
                      }
                      type="password"
                      placeholder="Konfirmasi Password"
                      value={confPassword}
                      onChange={(e) => {
                        setConfPassword(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        confPasswordVal();
                      }}
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
                    <p className="help is-danger">{msgVal.confPassword}</p>
                    <p className="help is-danger">{msg.confPassword}</p>
                  </div>
                </div>
                {/* <pre>{JSON.stringify(fotoMahasiswa, null, 2)}</pre> */}
                <div className="is-flex mt-5">
                  <button className="button mr-3 px-8 is-info is-fullwidth">
                    Daftar
                  </button>
                  <Link
                    to="/login"
                    className="button has-text-weight-semibold px-8 is-info is-light is-border is-fullwidth"
                  >
                    Masuk
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

export default Register;
