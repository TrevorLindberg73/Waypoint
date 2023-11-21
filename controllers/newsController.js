const News = require('../models/news');
const {fetchAndSaveNews} = require('../middleware/fetchAndSaveNews')

const espnRssUrl = 'https://www.espn.com/espn/rss/news';
const ignRssUrl = 'https://feeds.feedburner.com/ign/all';

// GET /articles/ufcarticle: renders ufc sample article
exports.showarticle = (req, res, next) => {
    res.render('./articles/ufcarticle');
};

exports.index = async (req, res, next) => {
    await fetchAndSaveNews(espnRssUrl, 'Sports');

    await fetchAndSaveNews(ignRssUrl, 'Gaming');

    const newsItems = await News.find().sort({pubDate: -1});

    res.render('index', {newsItems});
};