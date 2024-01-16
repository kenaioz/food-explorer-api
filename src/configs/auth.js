module.exports = {
  jwt: {
    secret: process.env.SECRETJWT_KEY || "default",
    expiresIn: "1d",
  },
};
