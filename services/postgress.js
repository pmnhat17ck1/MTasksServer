const Sequelize = require("sequelize");
const connectString =
  process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/mtasks";
const db = new Sequelize(connectString);
const clearDB = { force: true };
const postgress = async () => {
  await db
    .authenticate()
    .then(() => {
      console.log("Database postgress connected...");
    })
    .catch((err) => console.log(`Connect database postgress error: ${err}`));
  await db
    .sync()
    .then(() => {
      console.log("sync success");
    })
    .catch((err) => {
      console.error("sync fail: " + err);
    });

  return db;
};

module.exports = { postgress, db };
