import { Sequelize } from "sequelize";

const db = new Sequelize("profile_mahasiswa", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
