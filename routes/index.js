const express = require('express');
const router = express.Router();
const vinoController = require('../controllers/vinoController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passport = require('passport');
const passportConfig = require('../handlers/passport');


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
router.post('/login', catchErrors(authController.isActive), authController.login);

router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register
)

router.get('/logout', authController.logout);

router.get('/racun', authController.isLoggedIn, userController.racun);
router.post('/racun', catchErrors(userController.urediKorisnickiRacun));

router.get('/auth/facebook', catchErrors(passport.authenticate('facebook', {
  scope: 'email'
})));
router.get('/auth/facebook/callback', catchErrors(passport.authenticate('facebook', {
  successRedirect: '/',
  successFlash: `Uspješno ste se prijavili putem Facebooka. Dobrodošli`,
  failureRedirect: '/login',
  failureFlash: 'Nije Moguće!'
})));

router.get('/admin', catchErrors(userController.adminPanel));

router.get('/admin/oduzmi/:id', catchErrors(userController.oduzmiAdminPrava));
router.get('/admin/dodijeli/:id', catchErrors(userController.dodijeliAdminPrava));

router.get('/aktivacija', authController.aktivacija);
router.post('/aktivacija', catchErrors(authController.aktiviraj));

router.get('/reset', userController.reset);
router.post('/reset-email-form', catchErrors(userController.resetEmailForm));
router.get('/reset-pass/:token', catchErrors(userController.promjenaSifre));
router.post('/reset-pass/:token',
  userController.uporediSifre,
  catchErrors(userController.promjenaSifreFinal)
);

router.get('/galerija', vinoController.galerija);


module.exports = router;