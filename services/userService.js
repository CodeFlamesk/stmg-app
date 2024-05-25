
require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mailService");
const ApiError = require("../exceptions/apiError")
const UserDto = require("../dtos/user-dto");
const tokenService = require("./tokenService");
const mailService = require("./mailService");
const path = require("path");
const fs = require("fs");
const serviceAll = require("./serviceAll");

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

    async login(email, password) {
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден, проверьте правильность ввода вашего email')
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            
            if(!isPassEquals) {
                if(user) {
                    console.log(user)
                    throw ApiError.BadRequest("Неккоректный пароль, попробуйте еще раз.")
                }
            }

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens, user: userDto }
        } catch(e) {
            throw e
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

    async forgotPassword(email) {
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден, проверьте правильность ввода вашего email')
            }

            const code = await serviceAll.createCode();

            await mailService.sendPasswordForgot(email, code);

            return code;

        } catch(e) {
            throw e
        }
    }

    async changePasswordForgot(email, password) {
        
            const user = await User.findOne({email});

            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден, проверьте правильность ввода вашего email')
            }

            const hashPassword = await bcrypt.hash(password, 3);

            user.password = hashPassword;
            await user.save()
        
            return user;
    }

    async changePassword(password, newPassword, email) {
        
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден!')
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            
            if(!isPassEquals) {
                throw ApiError.BadRequest("Ваш прежний пароль введен неправильно.")
            }

            const hashPassword = await bcrypt.hash(newPassword, 3);

            user.password = hashPassword;
            await user.save();

            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
            return { ...tokens, user: userDto }
        } catch(e) {
            throw e
        }

    }

    async addAvatar(req, file, id){
        try {
            
            const user = await User.findById({_id: id});

            const avatarName = uuid.v4() + ".jpg";

            if(user.avatar) {
                const filePath = path.join(req.pathStatic + "/user", user.avatar);
                fs.unlinkSync(filePath); 
            }

            const filePath = path.join(req.pathStatic + "/user", avatarName);

            await file.mv(filePath);

            user.avatar = avatarName;
            await user.save();

            const userDto = new UserDto(user)
            
            return  userDto;
        } catch(e){
            throw e
        }
    }

    async deleteAvatar (req, id){
        try {
            const user = await User.findById({_id:id}); 
            
            console.log(user)
            if (!user) {
                throw  ApiError.BadRequest('Пользователь не был найден!')
            }
            if(!user.avatar) {
                throw  ApiError.BadRequest('Аватар у пользователя не был найден!')
            }

            const filePath = path.join(req.pathStatic + "/user", user.avatar);

            fs.unlinkSync(filePath); 

            user.avatar = "";
            await user.save();

            const userDto = new UserDto(user)
            
            return userDto;

        } catch(e) {
            throw e
            
        }
    }

    async userDelete(id, refreshToken) {
        try {
            const user = await User.findById({_id: id}); 
            
            await tokenService.removeToken(refreshToken);
            
            await User.deleteOne({ _id: id })
        } catch(e) {
        }    
    }


    async deleteComment(userId, commentId) {
        try {
            const user = await User.findOne({_id: userId});
            if (!user) {
                throw  ApiError.BadRequest('Пользователь не был найден!')
            } 
            
            user.comments = await user.comments.filter(item => item._id !== commentId);
            await user.save();
            
        } catch(e) {
            throw e;
        }
    }
}



module.exports = new UserService;