var express = require('express');
var router = express.Router();
const { getAll, create } = require('../controllers/postController')

router.get('/', (req, res, next) => req.app.validateUser(req, res, next), getAll);
router.post('/', (req, res, next) => req.app.validateUser(req, res, next), create);
// router.put('/:id', (req, res, next) => req.app.validateUser(req, res, next), updateById);
// router.delete('/:id', (req, res, next) => req.app.validateUser(req, res, next), deleteById);

module.exports = router;
