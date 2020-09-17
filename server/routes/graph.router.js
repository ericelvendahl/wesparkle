const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//  Part of logged user features only
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  // This query will return clicks per link by date for the logged in user
  const query = `
    SELECT DATE(timestamp) AS x, COUNT (*) AS y
    FROM click 
    WHERE link_id = $1
    GROUP BY DATE(timestamp)
    ORDER BY x;`;

  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT for details:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
