const serviceShortURL = require("./serviceShortURL");
const handle = require("../../helpers/handleResponse");

const listShortURLs = async (req, res) => {
  try {
    const resp = await serviceShortURL.listShortURLs();
    handle.success(req, res, resp, 200);
  } catch (error) {
    handle.error(req, res, e, 500);
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
    handle.error(req, res, e, 500);
  }
};

const updateShortURL = () => {};

const deleteShortURL = () => {};

module.exports = {
  listShortURLs,
  getShortURL,
  createShortURL,
  updateShortURL,
  deleteShortURL,
};
