const truckModel = require("./../models/truckModel");

exports.pushTruck = async ({ params }, res, next) => {
    const { name } = params; 

    if (!name) throw new Error("No name");
    
    const newTruck = await truckModel.create({
        name
    })

    return res.status(201).json(newTruck)
}

exports.getTrucksId = async(req, _, next) => {
    let trucksDB = await truckModel.find({ active: true });
    
    trucksDB = trucksDB.map(el => el._id);
    req["trucksDB"] = trucksDB;
    next();
}