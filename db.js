
const fs = require("fs").promises;

const db = {

    get: async () => {
        try {
            let data = await fs.readFile('./database.json', "utf8");
            let json = JSON.parse(data);
            return(json);
        }
        catch (err) {
            console.log(`db: ${err}`);
            return { "error": err };
        }
    },
    post: async (body) => {
        console.log(body);
        let data = await fs.readFile('./database.json', "utf8");
        let cdata = await JSON.parse(data);
        cdata.push(body);
        fs.writeFile("./database.json", JSON.stringify(cdata, null, 4));
    }
};

module.exports = {
    db,
};