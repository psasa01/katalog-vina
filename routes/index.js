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

router.post('/dodaj-vino/:id',
  vinoController.dodajSliku,
  vinoController.resize,
  catchErrors(vinoController.snimiUredjenoVino)
);

router.get('/vino/:id/ukloni', catchErrors(vinoController.ukloniVino));

router.get('/vina', catchErrors(vinoController.prikaziVina));
router.get('/vino/:id/uredi', catchErrors(vinoController.urediVino));

router.get('/zemlje', catchErrors(vinoController.pretraziPoZemljama));
router.get('/:zemlja', catchErrors(vinoController.pronadjenoPoZemljama));

module.exports = router;