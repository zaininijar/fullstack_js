import Mahasiswa from "./../models/MahasiswaModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll({
      attributes: ["id", "nama_mahasiswa", "nim", "foto_mahasiswa", "username", "password", "createdAt"],
    });
    res.json(mahasiswa);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const Register = async (req, res) => {

  const nama_mahasiswa = req.body.namaMahasiswa;
  const nim = req.body.nim;
  const username = req.body.username;
  const password = req.body.password;
  const confPassword = req.body.confPassword;
  
  var error = {};
  
  if (!nama_mahasiswa) {
    error['namaMahasiswa'] = "Nama mahasiswa tidak boleh kosong";
  }
  
  if (!nim) {
    error['nim'] = "NIM mahasiswa tidak boleh kosong";
  }
  
  if (!req.file) {
    error['fotoMahasiswa'] = "Foto mahasiswa tidak boleh kosong ya";
  }
  
  if (!username) {
    error['username'] = "Username tidak boleh kosong";
  }
  
  if (!password) {
    error['password'] = "Password tidak boleh kosong";
  }
  
  if (!confPassword) {
    error['confPassword'] = "Konfirmasi password tidak boleh kosong";
  }

  if (password !== confPassword) {
    error['passwordMatch'] = "Password dan konfirmasi password tidak sama"
  }

  if (Object.keys(error).length > 0) {
    return res
      .status(400)
      .json({ msg: error });
  }


  const image = req.file.path;
  console.log(image);

  const salt = await bcrypt.genSalt();

  const hasPassword = await bcrypt.hash(password, salt);

  try {
    await Mahasiswa.create({
      nama_mahasiswa: nama_mahasiswa,
      nim: nim,
      foto_mahasiswa: image,
      username: username,
      password: hasPassword,
    });

    res.status(200).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll({ where: { username: req.body.username } });
    const match = await bcrypt.compare(req.body.password, mahasiswa[0].password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    
    const mahasiswaId = mahasiswa[0].id;
    const nim = mahasiswa[0].nim;
    const userName = mahasiswa[0].username;
    
    const accessToken = jwt.sign(
      { mahasiswaId, nim, userName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { mahasiswaId, nim, userName },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Mahasiswa.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: mahasiswaId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true
    });

    res.json({ accessToken });

  } catch (error) {
    res.status(404).json({ msg: "Username tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  const mahasiswa = await Mahasiswa.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!mahasiswa[0]) return res.sendStatus(204);

  const mahasiswaId = mahasiswa[0].id;

  await Mahasiswa.update(
    { refresh_token: null },
    {
      where: { id: mahasiswaId },
    }
  );

  res.clearCookie("refreshToken");

  return res.sendStatus(200);
};
