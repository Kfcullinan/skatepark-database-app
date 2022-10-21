const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('/user GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // Authentication: Are you logged in?
  if (req.isAuthenticated()) {
      // Authorization: What level of access do you have?
      if (req.user.id === 1) {
          let queryText = `SELECT * FROM "skateparks"`;
          pool.query(queryText).then((result) => {
              res.send(result.rows);
          }).catch((error) => {
              console.log(error);
              res.sendStatus(500);
          });
      } else {
          let queryText = `SELECT * FROM "skateparks" WHERE "user_id" = $1`;
          pool.query(queryText, [req.user.id]).then((result) => {
              res.send(result.rows);
          }).catch((error) => {
              console.log(error);
              res.sendStatus(500);
          });
      }
  } else {
      res.sendStatus(403); // 403 Forbidden (must log in)
      // 401 Unauthorized (e.g. requires Admin but logged in as User)
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;