const { Favorite } = require("../models/index");

class FavoriteController {

  static async addFavMovie(req, res, next) {
    try {
      const { MovieId, title, poster_path } = req.body;
      const UserId = +req.userLoggedIn.id;
      let favObj = {
        title,
        poster_path,
        UserId,
        MovieId
      };
      const fav = await Favorite.create(favObj);
      res.status(201).json(fav);
    } catch (err) {
      next(err);
    }
  }

  static async showFavMovie(req, res, next) {
    try {
      const UserId = +req.userLoggedIn.id;
      const favs = await Favorite.findAll({ where: { UserId } ,order: [["updatedAt", "DESC"]] });
      res.status(200).json(favs);
    } catch (err) {
      next(err);
    }
  }

  static async deleteFavMovie(req, res, next) {
    try {
      let id = +req.params.id;
      const deletedFav = await Favorite.destroy({where: {id}});
      res.status(200).json({ msg: `Successfully delete your favorite movie!`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = FavoriteController;