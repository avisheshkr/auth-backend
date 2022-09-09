import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    const user = decodedToken;

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid requests!!!", error });
  }
};

export default authenticate;
