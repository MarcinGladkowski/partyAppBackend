import PartyType from '../models/partyType';


export default {
    /** create new party */
    async create(req, res) {

        return res.send({'status': 'ok'})
    },

    /** get all parties */
    async list(req, res) {

    },

    async upload(req, res) {
        if (!req.file) {
            console.log("No file received");
            return res.send({
              success: false
            });
        
          } else {
            console.log('file received');

            const image = {};
            image.url = req.file.url;
            image.id = req.file.public_id;

            return res.send({
              success: true
            })
          }
    }
}