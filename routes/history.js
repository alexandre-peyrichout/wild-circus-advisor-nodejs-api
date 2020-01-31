const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All history for one circus
router.get("/all/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT history.* , event.city, event.date, circus.*, user.firstname, user.lastname FROM history JOIN event ON event.idevent = history.event_idevent JOIN circus ON circus.idcircus = event.circus_idcircus JOIN user ON user.iduser = history.user_iduser HAVING circus.idcircus = ? ",
    [idUrl],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
});

// All history for one user
router.get("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query(
    "SELECT history.* , event.city, event.date, circus.image, circus.name FROM history JOIN event ON event.idevent = history.event_idevent JOIN circus ON circus.idcircus = event.circus_idcircus WHERE history.user_iduser = ?",
    [idUrl],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
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
router.put("/:user/:event", (req, res) => {
  const user = req.params.user;
  const event = req.params.event;
  const formData = req.body;

  connection.query(
    "UPDATE history SET ? WHERE user_iduser = ? AND event_idevent = ?",
    [formData, user, event],
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
