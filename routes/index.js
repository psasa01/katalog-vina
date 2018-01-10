const express = require('express');
const router = express.Router();
const vinoController = require('../controllers/vinoController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const {
  catchErrors
} = require('../handlers/errorHandlers');

router.get('/', catchErrors(vinoController.prikaziVina));
router.get('/dodaj-vino',
authController.isLoggedIn, 
vinoController.dodajVino
);

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

router.get('/zemlje', catchErrors(vinoController.pretragaPoZemljama));
router.get('/zemlje/:zemlja', catchErrors(vinoController.pretragaPoZemljama));

router.get('/vrste', catchErrors(vinoController.pretragaPoVrstama));
router.get('/vrste/:vrsta', catchErrors(vinoController.pretragaPoVrstama));

router.get('/korisnici', catchErrors(vinoController.pretragaPoKorisnicima));
router.get('/korisnici/:korisnik', catchErrors(vinoController.pretragaPoKorisnicima));

router.get('/login', userController.login);
router.post('/login', authController.login);

router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
)

router.get('/logout', authController.logout);

router.get('/racun', authController.isLoggedIn, userController.racun);
router.post('/racun', catchErrors(userController.urediKorisnickiRacun));



module.exports = router;