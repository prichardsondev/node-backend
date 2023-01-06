//preform logic -> send to db 

const { db } = require("./db");
const { v4: uuidv4 } = require('uuid');

const service = {
    putPet: async (body) => {
        try {
            //reshape data
            body = { id: uuidv4(), ...body }
            db.post(body);
        } catch (err) { }
    },
    getPets: async () => {
        let pets = await db.get();
        return pets;
    },

    //getPet: async(id)
    //deletePet: async(id)
    //...
};

module.exports = {
    service,
};