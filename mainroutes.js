const RegisterRoutes = require('./Controllers/Register/RegisterRoutes');
const LoginRoutes = require('./Controllers/Login/loginroutes');
const VlogRoutes = require('./Controllers/Vlogs/VlogRoutes');
const Category = require('./Controllers/Category/categoryRoutes');

module.exports = (app) => {
    app.use('/api', RegisterRoutes);
    app.use('/api', LoginRoutes);
    app.use('/api', VlogRoutes);
    app.use('/api', Category);
}