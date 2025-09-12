// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET = 'All the world a stage'; 

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.log('[AUTH] No token found in cookies');
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log(`[AUTH] Token verified for user "${decoded.username}"`);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('[AUTH] Invalid token:', err.message);
    res.status(403).send('Invalid token');
  }
}

module.exports = authMiddleware;
