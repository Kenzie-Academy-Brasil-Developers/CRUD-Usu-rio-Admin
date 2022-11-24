import users from "../database";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

//AUTH Services

export const createUser = async ({ email, password, name, isAdm }) => {
  const userFound = users.find((elem) => elem.email === email);
  if (userFound) {
    return [409, { message: "E-mail already registered." }];
  }

  const newUser = {
    uuid: uuidv4(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    createdOn: new Date(),
    updatedOn: new Date(),
    isAdm,
  };
  users.push(newUser);

  const responseUser = {
    uuid: newUser.uuid,
    name,
    email,
    createdOn: new Date(),
    updatedOn: new Date(),
    isAdm,
  };

  return [201, responseUser];
};

export const loginUser = async ({ email, password }) => {
  const user = users.find((elem) => elem.email === email);
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return [401, { message: "Wrong email/password" }];
  }

  const token = jwt.sign({}, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.uuid,
  });

  return [200, { token }];
};

//ADM Services

export const listUsers = async () => {
  return [200, users];
};

export const deleteUser = async ({ index }) => {};

//USER Services

export const listUser = async (index) => {
  let user = users[index];
  const { uuid, name, email, createdOn, updatedOn, isAdm } = user;
  const userReturn = {
    uuid,
    name,
    email,
    createdOn,
    updatedOn,
    isAdm,
  };
  return [200, userReturn];
};

export const updateUser = async (index, { email, password, name }) => {
  users[index].email = email;
  users[index].password = password;
  users[index].name = name;
  users[index].updatedOn = new Date();

  let user = users[index];
  console.log(name);
  console.log(user);

  const { uuid, nameUser, emailUser, createdOn, updatedOn, isAdm } = user;
  const userReturn = {
    uuid,
    name,
    email,
    createdOn,
    updatedOn,
    isAdm,
  };

  return [200, userReturn];
};
