const RegisterRoutes = require('./Controllers/Register/RegisterRoutes');
const LoginRoutes = require('./Controllers/Login/loginroutes');
const uploadroutes = require('./Controllers/uploadFile/uploadroutes');
const {Auth} = require('./middleWare/auth');

module.exports = (app) => {
    app.use('/api', RegisterRoutes);
    app.use('/api', LoginRoutes);
    app.use('/api', uploadroutes);
}