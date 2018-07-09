import jwt from 'jsonwebtoken';

module.exports = function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ auth: false,  token: null,  message: 'No token provided.' });
  } 

  jwt.verify(token, 'marcinwrc123', function(err, decoded) {

    if (err) {
      return res.status(401).send({ auth: false, token: null, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;

    console.log('decoded id:');
    console.log(decoded.id);

    next();
  });
}
