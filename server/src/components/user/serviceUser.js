import user from "./modelUser.js";

// Service for get by user by ID
const getUser = async (userId) => {
  try {
    const userBD = await user.findOne({ id: userId });
    if (!userBD) {
      //throw new Error("User not found");
      return "User not found";
    }
    return userBD;
  } catch (error) {
    throw new Error("Error getting user " + error);
  }
};

// Service for get by user by email
const getUserByEmail = async (email) => {
  try {
    const userBD = await user.findOne({ email: email });
    if (!userBD) {
      //throw new Error("User not found");
      return "User not found";
    }
    return userBD;
  } catch (error) {
    throw new Error("Error getting user " + error);
  }
};

// Service for create a new short URL
const createUser = async (req) => {
  const { name, email } = req.body;
  try {
    const data = {
      name,
      email,
    };
    const userBD = new user(data);
    await userBD.save();
    return userBD;
  } catch (error) {
    throw new Error(`Error saving user ${error}`);
  }
};

export default {
  getUser,
  getUserByEmail,
  createUser,
};
