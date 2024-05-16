
const ApiError = require("../exceptions/apiError");
const Newsletter = require("../models/Newsletter");


class NewsletterService {
    
    async subscribe(email) {
        try {   
            const newsletterUser = await Newsletter.findOne({email});

            if(newsletterUser) {
                throw  ApiError.BadRequest(`Пользователь с таким email: ${email} уже подписан на наши обьявления`);
            }
                
            // добавить проверку email на правильность ввода данных , и если что выкидывать ошибку, валидация
            const user = await Newsletter.create({email});
            await user.save();

            return user;

        }catch(e) {
            throw e
        }
    }
}

module.exports = new NewsletterService