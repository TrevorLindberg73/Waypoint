const News = require('../models/news');
const {fetchAndSaveNews} = require('../middleware/fetchAndSaveNews');
const {DateTime} = require('luxon');

const espnRssUrl = 'https://www.espn.com/espn/rss/news';
const ignRssFeed = 'https://feeds.feedburner.com/ign/all';

// GET /articles/ufcarticle: renders ufc sample article
exports.showarticle = (req, res, next) => {
    res.render('./articles/ufcarticle');
};

exports.index = async (req, res, next) => {
    await fetchAndSaveNews(espnRssUrl, 'Sports');

    await fetchAndSaveNews(ignRssFeed, 'Gaming');

    const newsItems = await News.find().sort({pubDate: -1}).lean();

    const formattedNewsItems = newsItems.map((item) => ({
        //using spread operator (...), basically copying news object into item
        ...item,
        formattedPubDate: DateTime.fromJSDate(item.pubDate).toLocaleString(DateTime.DATETIME_MED),
    }));

    res.render('index', {newsItems: formattedNewsItems});
};

exports.filter = async (req, res, next) => {
    const {category} = req.params;

    const filteredNewsItems = await News.find({ category }).sort({ pubDate: -1 }).lean();

    const formattedNewsItems = filteredNewsItems.map(({ pubDate, ...item }) => ({
        ...item,
        formattedPubDate: DateTime.fromJSDate(pubDate).toLocaleString(DateTime.DATETIME_MED),
    }));

    res.render('filteredNews', { newsItems: formattedNewsItems, category });
};