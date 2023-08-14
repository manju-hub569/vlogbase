module.exports.config = () => {

    return {
        mongoTest: function () {
            return process.env.mongour
        },
        mongoprod: function () {
            return process.env.mongourlprod
        }
    }

}