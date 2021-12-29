const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    getUserById = async (_, res, next) => {
        const user = await userModel.findById(res.locals._id);

        res.locals.user = JSON.parse(JSON.stringify(new userDTO(user)));
        next();
    }

    checkAuth = async (req, res, next) => {
        const authHeader = req.header.authorization;
        
        if (!authHeader) return new Error("No authHeader set");
        
        const accessToken = authHeader.split(" ")[1];
        
        if(!accessToken) return new Error("No accessToken set")

        res.locals.accessToken = accessToken;
        try {
            const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);

            res.locals.user = user;
        }
        catch(e) {
            throw new Error("Not valid AccessToken")
        }
        next();
    }
}