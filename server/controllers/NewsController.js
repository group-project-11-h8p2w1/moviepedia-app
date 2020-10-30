const axios = require('axios')

class News {
    static viewEntertainmentNews (req, res, next) {
        axios({
            url: `https://newsapi.org/v2/everything?q=movies&apiKey=${process.env.NEWS}`,
            method: 'GET',
        })
        .then(data => {
            res.status(200).json(data.sources)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = News