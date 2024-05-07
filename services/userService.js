
require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mailService");

const UserDto = require("../dtos/user-dto");
const tokenService = require("./tokenService");

class UserService {

    async registration(req, email, password) {
        const candidate = await User.findOne({email});
        if(candidate) {
            throw new Error(`Пользователь с таким ${email} уже существует`);

        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({email, password: hashPassword, activationLink});

        await MailService.sendActivationMail(req, email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }


    async activate(activationLink) {
        const user = await User.findOne({activationLink});

        if(!user) {
            throw new Error("Неккоректная ссылка активации")
        }
        user.isActivated = true;
        await user.save();
    }

}

module.exports = new UserService;