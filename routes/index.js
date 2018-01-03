const express = require('express');
const router = express.Router();
const vinoController = require('../controllers/vinoController');


const {
  catchErrors
} = require('../handlers/errorHandlers');

router.get('/', catchErrors(vinoController.getIndex));

module.exports = router;