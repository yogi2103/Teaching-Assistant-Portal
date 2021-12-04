const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.verifyCookie = async (req, res, next) => {
  const token=req.cookies.token
  if (!token) {
    return res.status(401).json({ msg: "access denied" });
  }
  try {
    const decoded = jwt.verify(token, "secretKey");
    if (!decoded) {
      res.clearCookie("token");
      return res.status(400).send("jwt expired");
    }
    req._id = decoded.subject;
    const item=await User.findOne({_id:req._id});
    req.user=item;
    next();
  } catch {
    res.clearCookie("token");
    (err) => console.log("err", err);
  }
};
