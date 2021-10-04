const jwt = require("jsonwebtoken");

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    const data = { uid: id };
    jwt.sign(
      data,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwt
}