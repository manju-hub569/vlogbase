const Register = require('../../models/register');

module.exports.Data = async (req, res) => {
    const data = await Register.find({});
    res.send({
        data
    })
}