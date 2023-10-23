import { errorHandling } from "../helper/errorHandling.js";
import models from "../model/init-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static async getUsers(req, res) {
    try {
      let users = await models.user.findAll({ order: [["id", "ASC"]] });

      res.send(errorHandling(users, 200, "Successfully displayed the data!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password, role } = req.body;

      let image = "https://itpoin.com/wp-content/uploads/2014/06/guest.png";

      const salt = bcrypt.genSaltSync(10);
      const passhash = bcrypt.hashSync(password, salt);

      let result = await models.user.create({
        username: username,
        email: email,
        password: passhash,
        role: role,
        image: image,
      });

      res.send(errorHandling(result, 201, "Successfully registered!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let result = await models.user.findOne({ where: { email: email } });

      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          const token = jwt.sign(
            {
              email: result.email,
              createdat: result.createdat,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          res.send(errorHandling(token, 200, "Login successfully!"));
        } else {
          res.send(errorHandling("Error", 401, "Password incorrect!"));
        }
      } else {
        res.send(errorHandling("Error", 401, "Email not registered!"));
      }
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async updateUsers(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const passhash = bcrypt.hashSync(password, salt);
      const result = await models.user.update(
        {
          username: username,
          email: email,
          password: passhash,
          role: role,
        },
        { where: { id: req.params.id }, returning: true }
      );

      result[0] === 1
        ? res.send(errorHandling(result, 200, "Successfully update user!"))
        : res.send(errorHandling("Error!", 400, "Failed update user!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async deleteUsers(req, res) {
    try {
      const result = await models.user.destroy({
        where: { id: req.params.id },
      });

      result
        ? res.send(errorHandling("Success!", 200, "Successfully delete user!"))
        : res.send(errorHandling("Failed!", 400, "Failed delete user!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async getDetailUsers(req, res) {
    try {
      const result = await models.user.findOne({
        where: { id: req.params.id },
      });

      result
        ? res.send(errorHandling(result, 200, "Successfully show detail user!"))
        : res.send(errorHandling("Failed!", 404, "This user is not found!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default UserController;
