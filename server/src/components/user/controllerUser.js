import serviceUser from "./serviceUser.js";
import handle from "../../helpers/handleResponse.js";

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const resp = await serviceUser.getUserByEmail(email);
    handle.success(req, res, resp, 200);
  } catch (error) {
    handle.error(req, res, error, 500);
  }
};

const createUser = async (req, res) => {
  try {
    const resp = await serviceUser.createUser(req);
    handle.success(req, res, resp, 200);
  } catch (error) {
    handle.error(req, res, error, 500);
  }
};

export { getUserByEmail, createUser };
