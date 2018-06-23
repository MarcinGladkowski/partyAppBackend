
export default {
    async login(req, res) {

        console.log(res.body);

        return res.send({'status': 'Zalogowano!'});

    }
};