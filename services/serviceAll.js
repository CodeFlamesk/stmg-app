

class ServiceAll {
    async createCode() {
        let id = "";
        for(let i = 0; i < 6; i++) {
            id += Math.floor(Math.random() * 10)
        }
        return id;
    }
}


module.exports = new ServiceAll