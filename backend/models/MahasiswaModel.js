import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Mahasiswa = db.define(
  "mahasiswa",
  {
    role_id: {
      type: DataTypes.BIGINT,
      default: 3,
    },
    nama_mahasiswa: {
      type: DataTypes.STRING,
      required: true,
    },
    nim: {
      type: DataTypes.BIGINT,
      required: true,
    },
    foto_mahasiswa: {
      type: DataTypes.STRING,
      required: true,
    },
    username: {
      type: DataTypes.STRING,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Mahasiswa;
