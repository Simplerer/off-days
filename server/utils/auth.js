const jwt = require('jsonwebtoken');

const secret = 'thisIsASecret';
const expiration = '3h';

module.exports = {
  authMiddleware: function ({req}) {

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Token is no good!')
    }
  };
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id};
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration };)
  }
}
