import { errorHandling } from "../helper/errorHandling.js";
import models from "../model/init-models.js";

class ItemController {
  static async getAllItems(req, res) {
    try {
      const result = await models.item.findAll({
        order: [["id", "ASC"]],
        include: { model: models.user, as: "user" },
      });

      result
        ? res.send(errorHandling(result, 200, "Successfully show items!"))
        : res.send(errorHandling("Error!", 400, "Failed show items!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async add(req, res) {
    try {
      const { name, category, price, stock, user_id } = req.body;

      let image =
        "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

      const result = await models.item.create({
        name: name,
        category: category,
        price: price,
        stock: stock,
        image: image,
        user_id: user_id,
      });

      result
        ? res.send(errorHandling(result, 200, "Successfully create items!"))
        : res.send(errorHandling("Error!", 400, "Failed create items!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async updateItems(req, res) {
    try {
      const { name, category, price, stock, user_id } = req.body;

      let image =
        "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

      const result = await models.item.update(
        {
          name: name,
          category: category,
          price: price,
          stock: stock,
          image: image,
          user_id: user_id,
        },
        { where: { id: req.params.id }, returning: true }
      );

      result[0] === 1
        ? res.send(errorHandling(result, 200, "Successfully update items!"))
        : res.send(errorHandling("Error!", 400, "Failed update items!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }

  static async deleteItems(req, res) {
    const result = await models.item.destroy({
      where: { id: req.params.id },
    });

    result
      ? res.send(errorHandling("Success!", 200, "Successfully delete item!"))
      : res.send(errorHandling("Failed!", 400, "Failed delete item!"));
  }
  catch(error) {
    res.send(errorHandling("Error!", 500, error.message));
  }

  static async getDetailItems(req, res) {
    try {
      const result = await models.item.findOne({
        where: { id: req.params.id },
      });

      result
        ? res.send(
            errorHandling(result, 200, "Successfully show detail items!")
          )
        : res.send(errorHandling("Failed!", 404, "This items is not found!"));
    } catch (error) {
      res.send(errorHandling("Error!", 500, error.message));
    }
  }
}

export default ItemController;
