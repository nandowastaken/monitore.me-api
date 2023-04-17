const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = (req: any, res: any, next: any) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res
        .status(403)
        .json({ mensagem: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ mensagem: "Invalid token." });
    }
    return next();
  };
  
  module.exports = verifyToken;
  