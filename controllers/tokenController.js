const jwt = require("jsonwebtoken");
const tokenModel = require("./../models/tokenModel");

class tokenController {

    generateTokens = (payload) => {
        const accessToken = jwt.sign(
            payload,
             process.env.ACCESS_TOKEN_SECRET_KEY, 
             { expiresIn: process.env.ACCESS_TOKEN_EXP })

        const refreshToken = jwt.sign(
            payload,
                process.env.REFRESH_TOKEN_SECRET_KEY, 
                { expiresIn: process.env.REFRESH_TOKEN_EXP })

        return {
            accessToken, refreshToken
        }
    }

    // res.locals.user is important!!!

    saveTokens = async (_, res, next) => {
        const tokens = this.generateTokens(res.locals.user);

        const tokenDB = await tokenModel.findOne({ user: res.locals.user._id })
        if(tokenDB){
            tokenDB.token = tokens.refreshToken;
            await tokenDB.save();
        }
        else {
            await tokenModel.create({
                user: res.locals.user._id,
                token: tokens.refreshToken
            })
        }
        res.cookie("refreshToken", tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        res.status(201).json({
            user: res.locals.user,
            tokens
        })
    }

    deleteToken = async (_, res, next) => {
        const deletedToken = await tokenModel.deleteOne({ token: res.locals.token})

        res.status(200).json(deletedToken);
    }

    checkRefreshToken = async (req, res, next) => {
        const { refreshToken } = req.cookies;
        if (!refreshToken) throw new Error("No Token provided");

        try {
            const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

            const token = await tokenModel.findOne({ token: refreshToken })
            if (!user || !token)
                throw new Error("Auth error, can't refresh token");
            res.locals["_id"] = user._id;
        }
        catch (err) {
            console.log(err.message, "message")
            throw new Error(err.message);
        }
        next();
    }
}

module.exports = new tokenController;