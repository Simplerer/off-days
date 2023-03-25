const jwt = require('jsonwebtoken');

const secret = 'thisIsASecret';
const expiration = '3h';

module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    
    if (!token) return req;
    
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
    }
    
    return req;
  },
  signToken: function({ username, email, _id, homeTown }) {
    const payload = { username, email, _id, homeTown};
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
  }
}
