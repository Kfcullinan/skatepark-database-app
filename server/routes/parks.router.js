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
          let queryText = `SELECT * FROM "skateparks" ORDER BY "id"`;
          pool.query(queryText).then((result) => {
              res.send(result.rows);
          }).catch((error) => {
              console.log('Error completing SELECT park query', error);
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

//GET selected skateparks
router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "skateparks" WHERE "id"=$1`;

    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows[0])
    })
    .catch(error => {
        console.log('Error completing SELECT skatepark query', error)
        res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "skateparks" WHERE "id"=$1`;

  pool.query(queryText, [req.params.id])
  .then(result => {
      res.send(result.rows[0])
  })
  .catch(error => {
      console.log('Error completing SELECT skatepark query', error)
      res.sendStatus(500)
  })
})

/**
 * POST route template
 */
 router.post('/', (req, res) => {
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created park
    
    const insertSkateparkQuery = `
    INSERT INTO "skateparks" ("name", "location", "space_type", "difficulty", "photo", "admin_id")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id"`;
  
    // FIRST QUERY MAKES PARK
    pool.query(insertSkateparkQuery, [req.body.name, req.body.location, req.body.space_type, req.body.difficulty, req.body.photo, req.user.id])
    .then(result => {
      console.log('New skatepark Id:', result.rows[0].id); //ID IS HERE!
      
      const createdSkateparkId = result.rows[0].id
      res.sendStatus(201);
      

      // Now handle the genre reference
      const insertSkateparkDetailsQuery = `
        INSERT INTO "skatepark_features" ("skatepark_id", "feature_id")
        VALUES  ($1, $2);
        `
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool.query(insertSkateparkDetailsQuery, [createdSkateparkId, req.body.feature_id]).then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
  
  //Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
  })

  router.put ('/:id', (req, res)=> {
    const queryText = `UPDATE "skateparks" SET "name"= $1, "location" = $2, "space_type" = $3, "difficulty" = $4, "photo" = $5
                      WHERE "id" = $6`;
    pool.query(queryText, [req.body.name, req.body.location, req.body.space_type, req.body.difficulty, req.body.photo, req.params.id])
    .then(results => {
      res.sendStatus(200);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
  })
  
module.exports = router;