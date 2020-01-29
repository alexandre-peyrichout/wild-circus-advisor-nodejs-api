const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All history
router.get("/", (req, res) => {
  connection.query("SELECT * from history", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Create a new history
router.post("/new", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO history SET ?", formData, err => {
    if (err) {
      res.status(500).send("Error creating new history");
    } else {
      res.sendStatus(200);
    }
  });
});

// Modify history
router.put("/:id", (req, res) => {
  const idUrl = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE history SET ? WHERE idhistory = ?",
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

// Route to Delete ONE history
router.delete("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query("DELETE FROM history WHERE idhistory = ?", [idUrl], err => {
    if (err) {
      res.status(500).send("Error deleting");
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
