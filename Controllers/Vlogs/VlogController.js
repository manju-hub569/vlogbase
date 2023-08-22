const VlogData = require('../../models/vlogs');

module.exports.vlogs = async (req, res) => {

   const {userid, vlog} = req.body;

   try {

    const data = await VlogData({
        userID : userid,
        vlog : vlog
    }).save()

    res.send({
        status : true,
        data : data
    })

   } catch (error) {

    console.log(error);
    res.send({
        status : true,
        error
    })

   }

}

module.exports.vlogsdata = async (req, res) => {

    try {
        const data = await VlogData.find({});
        res.send({
            status : true,
            data: data
        })        
    } catch (error) {
        console.log(error);
        res.send({error})
    }
}