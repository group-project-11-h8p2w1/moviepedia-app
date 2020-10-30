'use strict';
const {
  Model, ValidationError
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email is required!`
        },
        isEmail: {
          args: true,
          msg: `Wrong email format!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is required!`
        },
        len: {
          args: [6, 255],
          msg: `Password length minimum 6 characters!`
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};