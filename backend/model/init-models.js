import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _item from "./item.js";
import _user from "./user.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  }
);

function initModels(sequelize) {
  const item = _item.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  item.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(item, { as: "items", foreignKey: "user_id" });

  return {
    item,
    user,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };
