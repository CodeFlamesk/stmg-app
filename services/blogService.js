
const uuid = require("uuid");
const path = require("path");
const readingTime = require("reading-time");

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

    async createDate(){
        try {
            const dates = new Date();
            function getMonthName(month) {
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                return monthNames[month];
            }
        
            return `${getMonthName(dates.getMonth())} ${dates.getDate()}, ${dates.getFullYear()}`;
        }catch(e) {
            console.log(e)
        }
    }

    async createTimeReading(description) {
        try {
            const {time} = await readingTime(description);

            return `${Math.ceil(time / 1000 / 60)} minutes`;
            
        }catch(e) {
            console.log(e)
        }
    }
}

module.exports = new BlogService;
