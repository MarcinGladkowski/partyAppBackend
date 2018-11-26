import PartyType from '../models/partyType';


export default {
    /** create new party */
    async create(req, res) {

      if (!req.file) {
        console.log("No file received");
        return res.send({success: false});
      } else {

        console.log(req.file);

        const partyType = await new PartyType({
          name: req.body.name,
          desc: req.body.desc,
          filename: req.file.filename,
        }).save();

        return res.send({success: true})
      }
    },

    /** get all parties */
    async list(req, res) {

      const types = await PartyType.find({});

      return res.send({types});
    }
}