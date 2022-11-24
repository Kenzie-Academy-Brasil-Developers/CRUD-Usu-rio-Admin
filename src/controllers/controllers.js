import * as services from "../services/services";

//AUTH Controllers

export const createUserController = async (req, res) => {
  const [status, data] = await services.createUser(req.body);
  return res.status(status).json(data);
};

export const loginUserController = async (req, res) => {
  const [status, data] = await services.loginUser(req.body);
  return res.status(status).json(data);
};

//ADM Controllers

export const retrieveUsersController = async (req, res) => {
  const [status, data] = await services.listUsers(req.body);
  return res.status(status).json(data);
};

export const deleteUserController = async (req, res) => {
  const [status, data] = await services.deleteUser(req.params.id);
  return res.status(status).json(data);
};

//USER Controllers

export const updateUserController = async (req, res) => {
  const [status, data] = await services.updateUser(req.user.index, req.body);
  return res.status(status).json(data);
};

export const retrieveUserController = async (req, res) => {
  const [status, data] = await services.listUser(req.user.index);
  return res.status(status).json(data);
};
