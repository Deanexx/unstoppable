const calendarModel = require("./../models/monthModel");

/*

    Logic on creating a month : if there is no data in DB, then just creating a new Month
    if there is, then getting a last month and creating a new based on last

*/

exports.getCalendar = async (req, res, next) => {
    const calendar = await calendarModel
        .find({})
            .sort([["year", -1], ["month", -1]])
                .limit(4);

    res.status(200).json(calendar);
}

exports.pushMonth = async ({ trucksDB }, res, next) => {
    const DateObj = new Date();
    const lastMonth = await calendarModel
        .find({})
            .sort([["year", -1], ["month", -1]])
                .limit(1); // get the last month
    let month = lastMonth[0] ? lastMonth[0].month + 1 : DateObj.getMonth() + 1;
    let year = lastMonth[0] ? lastMonth[0].year : DateObj.getFullYear();
    
    if (month > 12) {
        month = 1;
        year += 1;
    }

    const cntDates = new Date(year, month, 0).getDate();
    
    let dates = [];
    for (let date = 1; date <= cntDates; date++) {
        let weekDate = new Date(year, month, date).getDay();
        let trucks = [];

        for (let j = 0; j < trucksDB.length; j++) {
            trucks.push({ truck: trucksDB[j] })
        }

        dates.push({ date, weekDate, trucks })
    }

    const newMonth = await calendarModel.create({
        year,
        month,
        dates
    })
    return res.status(201).json(newMonth)
}

// month/:month/date/:date/truck/:truck

exports.addWorkToCalendar = async (req, res, next) => { 
    const { month, date, truck } = req.params;
    const { work } = res.locals

    console.log(month, date, truck, work)
    if (!month || !date || !truck || !work) 
        throw new Error("No valid data");

    const monthDB = await calendarModel.findOne({ _id : month });
    const trucks = monthDB.dates[date - 1].trucks; // dangeros, if got time do a binary search
    for (let i = 0; i < trucks.length; i++) {
        if (trucks[i].truck.toString() === truck)
            trucks[i].work.push(work._id);
    }

    monthDB.save();
    
    res
        .status(201)
            .json(work);
}