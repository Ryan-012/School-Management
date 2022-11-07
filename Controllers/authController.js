const jwt = require("jsonwebtoken");
const tokenSecret = "192837b4rt983746ry4n029182739";
module.exports = function (req, res, next) {
  const token = req.query.token;
  if (!token) return res.status(401).render("notAccessibleTemplate");

  try {
    const userVerified = jwt.verify(token, tokenSecret);
    next();
  } catch (error) {
    res.status(401).render("notAccessibleTemplate");
  }
};
