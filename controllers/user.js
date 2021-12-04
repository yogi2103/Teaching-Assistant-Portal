const User = require("../models/user");

exports.verify = async function (req, res) {
  const uniqueString = req.params.uniqueString;
  const user = await User.findOne({ uniqueString });
  if (user) {
    const updated = await User.updateOne({ uniqueString }, { verified: true });
    res.send("email verified");
  } else {
    res.json("email not verified");
  }
};

exports.logout = function (req, res) {
  res.clearCookie("token");
  res.send({ success: true });
};
