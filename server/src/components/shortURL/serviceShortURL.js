import shortURL from "./modelShortURL.js";
import serviceUser from "../user/serviceUser.js";

// Service for get all url
const listShortURLs = async () => {
  try {
    const urls = await shortURL.find();
    return urls;
  } catch (error) {
    throw new Error("Error getting urls");
  }
};

// Service for get by user
const getShortURL = async (userId) => {
  try {
    const urls = await shortURL.findById(userId);
    if (!urls) {
      throw new Error("User not found");
    }
    return urls;
  } catch (error) {
    throw new Error("Error getting urls");
  }
};

// Service for create a new short URL
const createShortURL = async (req) => {
  const { longUrl, description, email } = req.body;
  try {
    const userBD = email ? await serviceUser.getUserByEmail(email) : null;

    const referer = req.get("Referer") || req.get("Origin");
    const baseURL = referer ? new URL(referer).origin : null;

    const shortUrl = Math.random().toString(36).substr(2, 6);
    const data = {
      url: longUrl,
      short: shortUrl,
      description,
      ...(userBD?._id && { user: userBD._id }),
    };

    const url = new shortURL(data);
    await url.save();
    const fullShortUrl = baseURL + "/" + shortUrl;
    return { fullShortUrl, description };
  } catch (error) {
    throw new Error(`Error saving short URL ${error}`);
  }
};

// Servicio para actualizar un usuario
const updateShortURL = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error("Error al actualizar el usuario");
  }
};

// Servicio para eliminar un usuario
const deleteShortURL = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error("Error al eliminar el usuario");
  }
};

export default {
  listShortURLs,
  getShortURL,
  createShortURL,
  updateShortURL,
  deleteShortURL,
};
