const monthModel = require("./../models/monthModel");

/*

    Logic on creating a month : if there is no data in DB, then just creating a new Month
    if there is, then getting a last month and creating a new based on last

*/

exports.pushMonth = async ({ trucksDB }, res, next) => {
    const DateObj = new Date();
    const lastMonth = await monthModel
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

    const newMonth = await monthModel.create({
        year,
        month,
        dates
    })
    return res.status(201).json(newMonth)
}

// /year/:year/month/:month/date/:date

exports.addWorkToCalendar = async (req, res, next) => { 
    console.log(res.locals);
    res.sendStatus(200)
} 