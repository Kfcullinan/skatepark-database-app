const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('/parks GET route');
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
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created park
    const insertSkateparkQuery = `
    INSERT INTO "skateparks" ("name", "location", "space_type", "difficulty")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`
  
    // FIRST QUERY MAKES PARK
    pool.query(insertSkateparkQuery, [req.body.name, req.body.location, req.body.space_type, req.body.difficulty])
    .then(result => {
      console.log('New skatepark Id:', result.rows[0].id); //ID IS HERE!
      
      const createdSkateparkId = result.rows[0].id
  
    //   // Now handle the genre reference
    //   const insertMovieGenreQuery = `
    //     INSERT INTO "movies_genres" ("movie_id", "genre_id")
    //     VALUES  ($1, $2);
    //     `
    //     // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
    //     pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
    //       //Now that both are done, send back success!
    //       res.sendStatus(201);
    //     }).catch(err => {
    //       // catch for second query
    //       console.log(err);
    //       res.sendStatus(500)
    //     })
  
  // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
  })

module.exports = router;