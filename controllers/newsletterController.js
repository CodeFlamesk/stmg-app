const newsletterService = require("../services/newsletterService");


class NewsletterController {
    
    async subscribe(req, res, next) {
        try {

            const {email} = req.body;
            const userNewsletter = await newsletterService.subscribe(email);

            return res.json(userNewsletter)
        }catch(e) {
            next(e)
        }
    }
}

module.exports = new NewsletterController