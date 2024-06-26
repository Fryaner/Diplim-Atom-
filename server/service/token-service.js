const jwt = require('jsonwebtoken');
const {Token} = require('../models/models');
require('dotenv').config();


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SERCRET, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRES_SERCRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken,
        }
    }
    
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {refreshToken}});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({where: {refreshToken}});
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SERCRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRES_SERCRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    
}

module.exports = new TokenService();