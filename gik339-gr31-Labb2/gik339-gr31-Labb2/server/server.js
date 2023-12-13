const express = require("express");
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.get("/users", (req, res) => {
  const db = new sqlite3.Database("./gik339-labb2.db");

  db.all("SELECT * FROM USERS", (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    }

    res.send(rows);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection");
  });
});

const sqlite3 = require("sqlite3").verbose();
