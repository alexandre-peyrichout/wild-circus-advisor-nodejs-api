const express = require("express");
const connection = require("../config");
const router = express.Router({ mergeParams: true });

// All history for one circus
router.get("/", (req, res) => {
  connection.query(
    "SELECT history.* , event.city, event.date, circus.idcircus, circus.image, circus.name, user.lastname, user.firstname FROM history JOIN event ON event.idevent = history.event_idevent JOIN circus ON circus.idcircus = event.circus_idcircus JOIN user ON user.iduser = history.user_iduser WHERE review <> 'null' ORDER BY history.idhistory DESC LIMIT 10",
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
});

module.exports = router;
