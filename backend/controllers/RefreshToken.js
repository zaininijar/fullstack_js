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
        const nim = mahasiswa[0].namaMahasiswa;
        const userName = mahasiswa[0].username;

        const accessToken = jwt.sign(
          { mahasiswaId, nim, userName },
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
