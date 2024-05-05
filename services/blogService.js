
const uuid = require("uuid");
const path = require("path");
class BlogService {

    async addImage(req, file) {
        try {
            const fileName = uuid.v4() + ".webp";
            const filePath = path.join(req.pathStatic, fileName);
            await file.mv(filePath);
            
            return fileName;
        }catch(e) {
            console.log(e)
        }
    }
}

module.exports = new BlogService;