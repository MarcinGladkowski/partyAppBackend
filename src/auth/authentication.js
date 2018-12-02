import jwt from 'jsonwebtoken';
import config from '../config/config';

export default function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ auth: false,  token: null,  message: 'No token provided.' });
  } 

  jwt.verify(token, config.secret, function(err, decoded) {

    if (err) {
      return res.status(401).send({ auth: false, token: null, message: 'Failed to authenticate token.' });
    }
    
    req.userId = decoded.id;

    next();
  });
}
