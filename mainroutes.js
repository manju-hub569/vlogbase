const RegisterRoutes = require('./Controllers/Register/RegisterRoutes');
const LoginRoutes = require('./Controllers/Login/loginroutes');
const Category = require('./Controllers/Category/categoryRoutes');
const userCart = require('./Controllers/UserCart/usercartroutes');

module.exports = (app) => {
    app.use('/api', RegisterRoutes);
    app.use('/api', LoginRoutes);
    app.use('/api', Category);
    app.use('/api', userCart);
}