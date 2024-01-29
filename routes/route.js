const express = require("express");
const app = express();

var router = express.Router();

  
router.get('/', function(req, res, next){
    res.render('home');
  });


module.exports = router;