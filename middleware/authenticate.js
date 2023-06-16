var jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  let headers = req.headers.authorization;
  if (!headers)
    return res.status(401).send({
      message: "authorization token not found",
    });

  const token = headers.split(" ")[1];
  jwt.verify(token, "key", function (err, decoded) {
    if (err)
      return res.status(402).send({
        message: err,
      });
    req.name = decoded.name;
    req.phone = decoded.phone;
    next();
  });
};

module.exports = authenticate;
