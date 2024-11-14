const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "User not logged in",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false
        });
      }

      req.user_id = decoded;

      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred during authentication",
      data: [],
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
