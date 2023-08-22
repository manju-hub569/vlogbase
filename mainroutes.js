const RegisterRoutes = require('./Controllers/Register/RegisterRoutes');
const LoginRoutes = require('./Controllers/Login/loginroutes');
const VlogRoutes = require('./Controllers/Vlogs/VlogRoutes');

module.exports = (app) => {
    app.use('/api', RegisterRoutes);
    app.use('/api', LoginRoutes);
    app.use('/api', VlogRoutes)
}