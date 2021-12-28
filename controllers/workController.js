const workModel = require("../models/workModel");


// work as a body param

exports.createWork = async ({ body }, res, next) => {
    const { work } = body;
    const newWork = await workModel.create(work);

    res.locals.work = newWork;
    next();
}