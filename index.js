const mysql = require("mysql2/promise");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const test = async () => {
  const pool = mysql.createPool({
    host: "mysql",
    user: "root",
    password: "1234",
  });

  const connection = await pool.getConnection();

  connection.query(`DROP SCHEMA IF EXISTS test;`);
  connection.query(`CREATE SCHEMA test;`);
  connection.query(`use test;`);

  connection.query(`
  CREATE TABLE test (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
  );`);
  connection.query(`
  INSERT INTO test (name)
    VALUES ('John'),('Peter');`);

  await connection.beginTransaction();

  const [rows] = await connection.execute("SELECT * FROM test WHERE name = ?", ["John"]);
  await connection.commit();
  connection.release();

  console.log(rows);
};

test();
