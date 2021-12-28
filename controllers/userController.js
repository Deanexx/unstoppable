const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const userDTO = require("./../dto/userDTO")

module.exports = new class userController {
    async register ({ body }, res, next) {
        const { email, password } = body;
        const user = await userModel.findOne({ email });

        if(user) throw new Error("User is existed in DB")

        const hashPassword = await bcrypt.hash(password, 3);
        const newUser = await userModel.create({
            email,
            password: hashPassword
        })
        res.locals.user = JSON.parse(JSON.stringify(new userDTO(newUser)));
        next();
    }

    async login (req, res, next) {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if(!user) throw new Error("User not found");

        const resultHash = await bcrypt.compare(password, user.password);
        if (!resultHash) throw new Error("Password isn't right");
        res.locals.user = JSON.parse(JSON.stringify(new userDTO(user)));
        next();
    }

    async logout (req, res, next) {
        const { refreshToken } = req.cookies;

        if(!refreshToken)
            throw new Error("No refreshToken in cookies")
        res.cookie("refreshToken", null, { maxAge: -1, httpOnly: true})
        res.locals.token = refreshToken;
        next();
    }

    getUserById = async (req, res, next) => {
        const user = await userModel.findById(res.locals._id);

        res.locals.user = JSON.parse(JSON.stringify(new userDTO(user)));
        next();
    }
}