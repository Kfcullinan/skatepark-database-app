const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
    const query = `SELECT * FROM "features" JOIN "skatepark_features"
                   ON "features"."id" = "skatepark_features"."features_id"
                   WHERE "skatepark_features"."skatepark_id"=$1`;
    pool.query(query, [req.params.id])
      .then(result => {
        // Return the first item in the array (which is an Object)
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all features', err);
        res.sendStatus(500)
      })
  });


module.exports = router;