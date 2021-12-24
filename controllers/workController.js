const workModel = require("../models/workModel");


// work as a body param

exports.createWork = async ({ body }, res, next) => {
    const { work } = body;
    console.log(work);
    const { _id } = await workModel.create(work);

    res.locals.workID = _id;
    next();
}