const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();
const News = require('../models/news');
const cheerio = require('cheerio');

exports.fetchAndSaveNews = async (url, category) => {
    try {
        const response = await axios.get(url);
        const feed = await parser.parseString(response.data);

        const newsItems = feed.items.map((item) => {
            let imageURL = '';

            if (item.enclosure && item.enclosure.url){
                imageURL = item.enclosure.url;
            }

            if (category === 'Sports' && imageURL === ''){
                imageURL = '/images/ESPN-logo.png';
            }

            if (category === 'Gaming'){
                imageURL = '/images/IGN-Logo.png';
            }

            return {
                title: item.title,
                category,
                pubDate: new Date(item.pubDate),
                creator: item.creator || '',
                imageURL,
                link: item.link,
                guid: item.guid || ''
            };
        });

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