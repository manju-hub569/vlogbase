const express = require('express');
const RegisterRoutes = require('./Controllers/Register/RegisterRoutes');
const LoginRoutes = require('./Controllers/Login/loginroutes');
const userCart = require('./Controllers/UserCart/usercartroutes');
const Category = require('./Controllers/Category/categoryRoutes')


const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes
router.use('/api', RegisterRoutes);
router.use('/api', LoginRoutes);
router.use('/api', userCart);
router.use('/api', Category);

module.exports = router;
