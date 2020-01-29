const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config");

const router = express.Router({
  mergeParams: true
});

// Route to select ALL users
router.get("/", (req, res) => {
  connection.query("SELECT * from user", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Select everything we need from one user
router.get("/test", (req, res) => {
  const { user } = req.query;
  connection.query(
    "SELECT * FROM task_has_destination JOIN destination ON destination.iddestination = task_has_destination.destination_iddestination JOIN task ON task.idtask = task_has_destination.task_idtask JOIN task_type ON task_type.idtask_type = task.task_type_idtask_type JOIN situation ON situation.idsituation = destination.situation_idsituation JOIN reason ON reason.idreason = destination.reason_idreason JOIN user ON user.iduser = destination.user_iduser JOIN country ON country.idcountry = destination.country_idcountry JOIN city ON city.idcity = destination.city_idcity WHERE user.iduser = ?",
    user,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving task_has_destination");
      } else {
        res.json(results);
      }
    }
  );
});

// Route to select one user
router.get("/:id", (req, res) => {
  const idUser = req.params.id;
  connection.query(
    "SELECT * from user WHERE iduser = ?",
    idUser,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving user");
      } else {
        res.json(results);
      }
    }
  );
});

// Create a new User
router.post("/new", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 5);
  const formData = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: hash,
    level: req.body.level
  };
  connection.query("INSERT INTO user SET ?", formData, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// Login
router.post("/signin", (req, res) => {
  let formData = {
    email: req.body.email
  };
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [formData.email],
    (err, result) => {
      if (err) {
        res.status(500).send("login error");
      } else {
        formData = {
          email: req.body.email,
          password: req.body.password
        };
        console.log("ok", result, formData);

        if (result.length === 0) {
          res.status(500).send("no email correspond");
        }

        const isSame = bcrypt.compareSync(
          formData.password,
          result[0].password
        );

        if (!isSame) {
          res.status(403).send("wrong password");
        } else {
          jwt.sign(
            {
              result
            },
            "chaussetterouge123",
            {
              expiresIn: "3000s"
            },
            (err, token) => {
              res.json(token);
            }
          );
        }
      }
    }
  );
});

// Modify a user
router.put("/:id", (req, res) => {
  const idUrl = req.params.id;
  const formData = req.body.info;

  console.log(formData);

  connection.query(
    "UPDATE user SET ? WHERE iduser = ?",
    [formData, idUrl],
    err => {
      if (err) {
        res.status(500).send("Error to modify a User");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Delete ONE user
router.delete("/:id", (req, res) => {
  const idUrl = req.params.id;
  connection.query("DELETE FROM user WHERE iduser = ?", [idUrl], err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
