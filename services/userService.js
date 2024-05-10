
require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mailService");
const ApiError = require("../exceptions/apiError")
const UserDto = require("../dtos/user-dto");
const tokenService = require("./tokenService");

class UserService {

    async registration(req, email, password, name, surname) {
        const candidate = await User.findOne({email});
        if(candidate) {
            throw  ApiError.BadRequest(`Пользователь с таким ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({email, password: hashPassword, activationLink, name, surname});

        await MailService.sendActivationMail(req, email, name, surname, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }


    async activate(activationLink) {
        const user = await User.findOne({activationLink});

        if(!user) {
            throw  ApiError.BadRequest("Неккоректная ссылка активации")
        }
        user.isActivated = true;
        await user.save();
    }


    async login(email, password, next) {
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest("Пользователь не был найден")
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if(!isPassEquals) {
                if(!user) {
                    throw  ApiError.BadRequest("Неккоректный пароль")
                }
            }

            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens, user: userDto }
        }catch(e) {
            next(e)
        }
    }


    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken)  {
            throw ApiError.UnathorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnathorizedError();
        }

        const user = await User.findById(userData.id);

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }


    async getUsers() {
        const users = await User.find()
        return users;
    }
}



module.exports = new UserService;