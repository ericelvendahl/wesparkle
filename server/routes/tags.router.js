const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
router.get("/:tags", rejectUnauthenticated, (req, res) => {
  let queryString = `
    SELECT * FROM link WHERE $1 = ANY (tags) AND user_id = $2
    AND "disabled_link" = FALSE
    ORDER BY id DESC;
  `;
  pool
    .query(queryString, [req.params.tags, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

//sorts link list by newest links first with tags sent
router.get("/newer/:tags", rejectUnauthenticated, (req, res) => {
  let queryString = `
      SELECT * FROM link WHERE $1 = ANY (tags) AND user_id = $2
      AND "disabled_link" = FALSE
      ORDER BY "date_created" DESC;
    `;
  pool
    .query(queryString, [req.params.tags, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

//sorts link list by oldest links first with tags sent
router.get("/older/:tags", rejectUnauthenticated, (req, res) => {
  let queryString = `
        SELECT * FROM link WHERE $1 = ANY (tags) AND user_id = $2
        AND "disabled_link" = FALSE
        ORDER BY "date_created" ASC;
      `;
  pool
    .query(queryString, [req.params.tags, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

//Sorts link list by oldest links first if no tags sent
router.get("/", rejectUnauthenticated, (req, res) => {
  let queryString = `
  SELECT * from link
  WHERE "user_id" = $1 AND "disabled_link" = FALSE 
  ORDER BY "date_created" ASC;
      `;
  pool
    .query(queryString, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});
module.exports = router;
