const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All circus
router.get("/", (req, res) => {
  connection.query("SELECT * from circus", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Create a new circus
router.post("/new", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO circus SET ?", formData, err => {
    if (err) {
      res.status(500).send("Error creating new circus");
    } else {
      res.sendStatus(200);
    }
  });
});

// Modify circus
router.put("/:id", (req, res) => {
  const idUrl = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE circus SET ? WHERE idcircus = ?",
    [formData, idUrl],
    err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Route to Delete ONE circus
router.delete("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query("DELETE FROM circus WHERE idcircus = ?", [idUrl], err => {
    if (err) {
      res.status(500).send("Error deleting");
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
