const jwt = require('jsonwebtoken');
const authMiddleware = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, 'mktraders_jazib');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
module.exports = authMiddleware;