import PartyType from '../models/partyType';

export default {
    /** create new party */
    async create(req, res) {
      if (!req.file) {
        return res.send({success: false});
      } else {
        const { name, desc } = req.body;
        const filename = req.file.filename;
        const partyType = await new PartyType({name, desc, filename}).save();
        return res.status(201).send(partyType);
      }
    },

    /** get all parties */
    async findAll(req, res) {
      const types = await PartyType.find({});
      return res.send({types});
    }
}