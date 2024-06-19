import serviceShortURL from "./serviceShortURL.js";
import handle from "../../helpers/handleResponse.js";

const listShortURLs = async (req, res) => {
  try {
    const resp = await serviceShortURL.listShortURLs();
    handle.success(req, res, resp, 200);
  } catch (error) {
    handle.error(req, res, error, 500);
  }
};

const getShortURL = () => {
  console.log("getShortURL");
};

const createShortURL = async (req, res) => {
  try {
    const resp = await serviceShortURL.createShortURL(req);
    console.log("createShortURL", resp);
    handle.success(req, res, resp, 200);
  } catch (error) {
    handle.error(req, res, error, 500);
  }
};

const updateShortURL = () => {};

const deleteShortURL = () => {};

export {
  listShortURLs,
  getShortURL,
  createShortURL,
  updateShortURL,
  deleteShortURL,
};
