// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Try to get token from Authorization header or cookie
  const header = req.headers['authorization'];
  const tokenFromHeader = header && header.split(' ')[0] === 'Bearer' ? header.split(' ')[1] : null;
  const token = tokenFromHeader || req.cookies.token;

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token invalid' });
  }
};