const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const iplocate = require("node-iplocate");
router.get("/", rejectUnauthenticated, (req, res) => {
  let queryString = `
  SELECT * from link
  WHERE "user_id" = $1 AND "disabled_link" = FALSE 
  ORDER BY "date_created" DESC
  ;`;
  pool
    .query(queryString, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT for links when logged in:", error);
      res.sendStatus(500);
    });
});

router.get("/:short_url", async (req, res) => {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN;");
    // Get appropriate 'link' for submitted short_url
    const queryString = `
      SELECT * FROM "link" WHERE short_url = '${req.params.short_url}';`;
    const linkRecord = await connection.query(queryString);
    // Get the id from the query result
    const longUrl = linkRecord.rows[0].long_url;

    // Get client's IP
    const clientIP = req.connection.remoteAddress;

    // Get location from iplocate
    // Note: this will not work on localhost
    // Must be run from deployed server to get correct IP
    let clientPostalCode = "";
    await iplocate("66.39.154.26").then((results) => {
      clientPostalCode = results.postal_code;
    });
    const queryString2 = `INSERT INTO click (link_id, client_ip, referrer) VALUES ($1, $2, $3);`;
    await connection.query(queryString2, [
      linkRecord.rows[0].id,
      clientPostalCode,
      req.headers.referer,
    ]);
    await connection.query("COMMIT;");
    res.redirect(longUrl);
  } catch (err) {
    console.log("Error on redirect/add click", err);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const link_id = req.params.id;
  const queryString = `UPDATE "link" SET disabled_link = true WHERE link.id = $1;`;
  pool
    .query(queryString, [link_id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});
router.post("/", async (req, res) => {
  const link = req.body;
  if (req.user != undefined) {
    const queryString = `INSERT INTO "link" ("user_id", "long_url", "short_url", "tags")
    VALUES ($1, $2, $3, '{"example tag"}');`;
    pool
      .query(queryString, [req.user.id, link.long_url, link.short_url])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("error in link POST when no user is registered:", error);
        res.sendStatus(500);
      });
  } //end if there is a user
  else {
    const queryString = `INSERT INTO "link" ("long_url", "short_url")
    VALUES ($1, $2);`;
    pool
      .query(queryString, [link.long_url, link.short_url])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("error in link POST when no user is registered:", error);
        res.sendStatus(500);
      });
  } //end if there is NO user logged in
});
module.exports = router;
