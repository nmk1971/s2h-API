var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({api:'S2H-Quiz Secured API' });
});

module.exports = router;
