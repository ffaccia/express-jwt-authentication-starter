const router = require('express').Router();
const exportObj = require('express').exportObj;

router.use('/users', require('./users').router);


module.exports = router;