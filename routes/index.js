const express = require('express');
const router = express.Router();
const vinoController = require('../controllers/vinoController');


const {
  catchErrors
} = require('../handlers/errorHandlers');

router.get('/', catchErrors(vinoController.getIndex));
router.get('/dodaj-vino', vinoController.dodajVino);
router.post('/dodaj-vino', catchErrors(vinoController.snimiVino));

module.exports = router;