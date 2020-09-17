const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//route that gets the details for a particular link for a particular user
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const query = `
  SELECT * from link
WHERE "user_id" = $2 AND "id" = $1
;`;
  pool
    .query(query, [req.params.id, req.user.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//route that edits the tags of a particular link
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const link = req.body;
  const queryString = `UPDATE "link" SET
    tags = $1 
    WHERE id = $2
    AND user_id = $3;`;
  pool
    .query(queryString, [link.tags, link.details.id, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
