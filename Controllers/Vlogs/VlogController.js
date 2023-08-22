const VlogData = require('../../models/vlogs');

module.exports.vlogs = async (req, res) => {

   const {userid, vlog} = req.body;

   try {

    const data = await VlogData({
        userid : userid,
        vlog : vlog
    })

    const resp = await data.save();

    res.send({
        status : true,
        data : resp
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
        const data = await VlogData.find({ userid : req.params.id});
        res.send({
            status : true,
            data: data
        })        
    } catch (error) {
        console.log(error);
        res.send({error})
    }
}