module.exports.config = () => {

    return {
        mongoTest: function () {
            return process.env.mongourl
        },
        mongoprod: function () {
            return process.env.mongourlprod
        }
    }

}