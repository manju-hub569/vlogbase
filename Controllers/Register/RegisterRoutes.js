const express = require('express');
const router = express.Router();
const RegisterControle = require('./RegisterControle');
const upload = require('../../middleWare/multer');
const { AdminAuthorization ,AdminVerification} = require('../../middleWare/auth')

router.post('/register',upload.single('filename'), (req, res) => {
    RegisterControle.register(req, res);
});

router.post("/refreshToken", AdminAuthorization, (req, res) => {
  res.status(200).send({
      tokenDetails: req.tokenDetails,
      msg: "refreshToken"
  })

})

router.post('/adminVerification', async (req, res) => {
  AdminVerification(req, res)
});

module.exports = router;
