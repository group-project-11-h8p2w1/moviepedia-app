const { Favorite } = require("../models/index");

async function authorization(req, res, next) {
  try {
    let id = +req.params.id;
    const favorite = await Favorite.findByPk(id);
    if (!favorite) {
      throw { msg: `Error not found!`, status: 404 };
    } else if (favorite.UserId === req.userLoggedIn.id) {
      next();
    } else {
      throw { msg: `Not authorized!`, status: 401 };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;