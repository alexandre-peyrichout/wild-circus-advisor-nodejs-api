const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All event
router.get("/", (req, res) => {
  connection.query("SELECT * from event", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Create a new event
router.post("/new", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO event SET ?", formData, err => {
    if (err) {
      res.status(500).send("Error creating new event");
    } else {
      res.sendStatus(200);
    }
  });
});

// Modify event
router.put("/:id", (req, res) => {
  const idUrl = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE event SET ? WHERE idevent = ?",
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

// Route to Delete ONE event
router.delete("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query("DELETE FROM event WHERE idevent = ?", [idUrl], err => {
    if (err) {
      res.status(500).send("Error deleting");
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
