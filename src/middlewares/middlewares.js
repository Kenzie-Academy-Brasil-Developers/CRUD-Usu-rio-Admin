import jwt from "jsonwebtoken";
import "dotenv/config";
import users from "../database";

export const verifyAuth = async (req, res, next) => {
  let authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: "Missing authorization headers.",
    });
  }

  authorization = authorization.split(" ")[1];

  jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    req.user = {
      uuid: decoded.sub,
    };

    return next();
  });
};

export const verifyUserExists = async (req, res, next) => {
  const userIndex = users.findIndex((elem) => elem.uuid === req.user.uuid);
  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  req.user.index = userIndex;

  return next();
};

export const verifyIsAdmin = async (req, res, next) => {
  const user = users.find((elem) => elem.uuid === req.user.uuid);
  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  const userIsAdm = user.isAdm === true;
  if (!userIsAdm) {
    return res.status(403).json({ message: "Missing admin permissions." });
  }
  return next();
};

export const verifyUserIsHimself = async (req, res, next) => {
  const user = users.find((elem) => elem.uuid === req.user.uuid);
  if (req.params.id === req.user.uuid) {
    return next();
  }

  if (user.isAdm === true) {
    return next();
  }

  return res.status(403).json({
    message: "Missing admin permissions.",
  });
};
