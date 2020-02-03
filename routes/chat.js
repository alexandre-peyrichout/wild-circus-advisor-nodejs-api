const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All msg
router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM chat ORDER BY idchat ASC",

    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
});

// Create a new msg
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO chat SET ?", formData, err => {
    if (err) {
      res.status(500).send("Error creating new chat msg");
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
