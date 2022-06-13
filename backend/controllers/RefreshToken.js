import Mahasiswa from "../models/MahasiswaModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const mahasiswa = await Mahasiswa.findAll({
      where: { refresh_token: refreshToken },
    });

    if (!mahasiswa[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const mahasiswaId = mahasiswa[0].id;
        const namaMahasiswa = mahasiswa[0].nama_mahasiswa;
        const nim = mahasiswa[0].nim;
        const fotoMahasiswa = process.env.APP_URL + mahasiswa[0].foto_mahasiswa;
        const userName = mahasiswa[0].username;

        const accessToken = jwt.sign(
          { mahasiswaId, namaMahasiswa, nim, fotoMahasiswa, userName},
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
