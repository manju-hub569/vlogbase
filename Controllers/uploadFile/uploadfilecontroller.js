module.exports.upload = (req, res) => {
    if(req.file !== undefined) {
        res.status(200).send({
            status: true,
            msg: "File Upload Successfull"
        })
    } else {
        res.status(400).send({
            status: false,
            msg: "File Uplaod UnSuccessfull"
        })
    }
}