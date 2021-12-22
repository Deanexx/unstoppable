exports.pushMonth = (req, res, next) => {
    const DateObj = new Date();

    const currentYear = DateObj.getFullYear();
    const currentMonth = DateObj.getMonth() + 1 + 1;

    const hmDays = new Date(currentYear, 12, 0);
    console.log(hmDays)

    return res.status(200).json({ status: "OK"}); 
}