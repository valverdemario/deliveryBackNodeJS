const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(data);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error getting users",
      });
    }
  },
  async create(req, res, next) {
    try {
      const user = req.body;
      const data = await User.create(user);
      res.status(201).json({
        success: true,
        message: "Successfully created user",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error,
      });
    }
  },

  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const myUser = await User.findByEmail(email);

      if (!myUser) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, myUser.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            id_user: myUser.id_user,
            email: myUser.email,
          },
          keys.secretKey,
          { expiresIn: "1h" }
        );

        const data = {
          id_user: myUser.id_user,
          email: myUser.email,
          name: myUser.name,
          lastname: myUser.lastname,
          phone: myUser.phone,
          image: myUser.image,
          session_token: `JWT ${token}`,
        };

        return res.status(200).json({
          success: true,
          message: "Successfully logged in",
          data: data,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password incorrect",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error login user",
        error: error,
      });
    }
  },
};
