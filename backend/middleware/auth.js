const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  if (process.env.SKIP_MONGODB) {
    req.userId = req.query.user || req.body.user || '1';
    return next();
  }
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;