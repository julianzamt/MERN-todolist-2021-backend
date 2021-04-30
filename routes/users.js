var express = require('express');
var router = express.Router();
const { login, create } = require('../controllers/userController')

router.post('/', login);
router.post('/register', create);

module.exports = router;