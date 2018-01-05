const express = require('express');
const router = express.Router();
const vinoController = require('../controllers/vinoController');


const {
  catchErrors
} = require('../handlers/errorHandlers');

router.get('/', catchErrors(vinoController.prikaziVina));
router.get('/dodaj-vino', vinoController.dodajVino);
router.post('/dodaj-vino', 
  vinoController.dodajSliku,
  vinoController.resize,
  catchErrors(vinoController.snimiVino)
);

router.get('/vina', catchErrors(vinoController.prikaziVina));

module.exports = router;