//pull data from request -> validate -> send to service -> return response
//from service to view
const { service } = require("./service");

const controller = {
  putPet: async (req, res) => {
    try {
      let body = req.body;
      console.log("controller", body);

      //validate...

      if (body) {
        await service.putPet(body);
        res.status(201).json();
      } else res.status(404).json();

    } catch (err) {
      console.log("controller putPet", err.message);
      res.status(500).json();
    }
  },

  getPets: async (req, res) => {
    try {
      let pets = await service.getPets();
      res.status(200).json({
        success: true,
        data: pets
      });
    } catch (err) {
      console.log("controller getPets...", err.message);
      res.status(500).json();
    }
  },
};

module.exports = {
  controller,
};