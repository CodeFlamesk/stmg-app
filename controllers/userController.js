const ApiError = require("../exceptions/apiError");
const userService = require("../services/userService")
const {validationResult} = require("express-validator")

class UserController {

    async registration(req, res, next) {
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const {email, password, name, surname} = req.body;

            const userData = await userService.registration(req, email, password, name, surname);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }catch(e) {
            next(e)
        }
    }
    

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            const userData = await userService.login(email, password);
            
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            
            return res.json(userData);
        }catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {

            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie("refreshToken");

            return res.json(token)
        }catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch(e) {
            next(e)
        }      
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers()
            return res.json(users)
        } catch(e) {
            next(e)
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const {email} = req.body;
            
            const code = await userService.forgotPassword(email);
            return res.json(code)
        } catch(e) {
            next(e)
        }
    }

    async changePasswordForgot(req, res, next) {
        
            try {
                const {email, password} = req.body;
            
                await userService.changePasswordForgot(email, password);
    
                return res.json({message: "Вы поменяли пароль"});
            } catch(e) {
                
            }
    }

    async changePassword(req, res, next) {
        try {
            const {password, email, newPassword} = req.body;
            
            const userData = await userService.changePassword(password, newPassword, email);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);

        } catch(e) {
            next(e)
        }
    }

    async addImage(req, res, next) {
        try {
            const {file} = req.files;
            const {id} = req.body;
            const userData = await userService.addAvatar(req, file, id);
            return  res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async deleteAvatar(req, res, next) {
        try {
            const id = req.params.id;
            
            const userData = await userService.deleteAvatar(req, id);

            return  res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            const {refreshToken} = req.cookies;
            res.clearCookie("refreshToken");
            await userService.userDelete(id, refreshToken);

            return res.json({message: "Delete user"}); 
        }catch(e) {
            next(e)
        }
    }
} 


module.exports = new UserController