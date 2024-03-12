const { ObjectId } = require('mongodb');

const convertStringToObjectIds = (req, res, next) => {
    const convertFieldToObjectId = (field) => {
        if (ObjectId.isValid(req.body[field])) {
            req.body[field] = new ObjectId(req.body[field]);
        }
    };

    for (const field in req.body) {
        if (typeof req.body[field] === 'string') {
            convertFieldToObjectId(field);
        }
    }

    next();
};

const convertStringToNumber = (req, res, next) => {
    const convertFieldToNumber = (field) => {
        if (!isNaN(parseFloat(req.body[field]))) {
            req.body[field] = parseFloat(req.body[field]);
        }
    };

    for (const field in req.body) {
        if (typeof req.body[field] === 'string') {
            convertFieldToNumber(field);
        }
    }

    next();
};

module.exports = { convertStringToObjectIds, convertStringToNumber};
