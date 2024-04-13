
const jwt = require("jsonwebtoken");


exports.getCurrentUser = async (req, res) => {
  try {

    const data =  req.cookies['user'] || null;
    return res.status(200).send(data || "No Data found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const jwtSecretKey = "sec" ;//process.env.JWT_SECRET_KEY;
    const user = {
        id: req.body.id,
        email: req.body.email
      };
    const token = jwt.sign(user, jwtSecretKey); 
    user.token = token;

    res.setHeader("x-auth-token",token);
//    res.cookie("user",{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
    res.cookie("user",user,{ maxAge: 10000, httpOnly: true }); // maxAge: 10 Sec
   
    return res.status(200).send(token);

  } catch (error) {
    res.status(500).send(error.message);
  }
};
