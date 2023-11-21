const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();
const News = require('../models/news');

exports.fetchAndSaveNews = async (url, category) => {
    try {
        const response = await axios.get(url);
        const feed = await parser.parseString(response.data);

        const newsItems = feed.items.map((item) => ({
            title: item.title,
            category,
            pubDate: new Date(item.pubDate),
            creator: item.creator || '',
            guid: item.guid || ''
        }));

        for (const item of newsItems) {
            const existingArticle = await News.findOne({guid: item.guid});

            if (!existingArticle) {
                await News.insertMany(item);
            }
        }
    } catch (err) {
        console.error('Error fetching and saving news from ' + url + ':' + err.message);
    }
};