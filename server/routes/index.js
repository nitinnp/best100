'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();
var amazon = require('amazon-product-api');
var xml = require('xml');
var util = require('util');
var request = require('request');
var amazonMap = null;
var itunesMap = null;
amazonMap = {
    'Laptops': 'Electronics-Laptops',
    'Desktop': 'Electronics-Desktops',
    'Cell Phones': 'Electronics-Carrier Cell Phones-salesrank',
    'Televisions': 'Electronics-LED TVs & LCD TVs-salesrank',
    'Camera': 'Electronics-Digital Cameras, Best Sellers-salesrank',
    'Books': 'Books-Best Sellers',
    'VideoGames': 'VideoGames-Games-salesrank',
    'Apps': 'MobileApps-Android',
    'Movies': 'Movies-Best Sellers',
    'Songs': 'Music-Audio-salesrank',
    'Music Videos': 'Music-Video-salesrank',
    'Audio Books': 'Books-eBooks'
};
itunesMap = {
    'Laptops': '',
    'Desktop': '',
    'Cell Phones': '',
    'Televisions': '',
    'Camera': '',
    'Books': '',
    'Video Games': '',
    'Apps': 'topfreeapplications',
    'Movies': 'topmovies',
    'Songs': 'topsongs',
    'Music Videos': 'topmusicvideos',
    'TV Episodes': 'toptvepisodes',
    'Audio Books': 'topaudiobooks'
};
router.get('/ituneslisting', function (req, res, next) {
    console.log("Inside itunes listing");
    var param = req.param('searchIndex');
    console.log(param);
    var searchIndex = itunesMap[param];
    console.log(searchIndex);
    request('https://itunes.apple.com/us/rss/' + searchIndex + '/limit=20/json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.set('Content-Type', 'application/json');
            res.json(JSON.parse(body));
        }
    });
});
router.get('/amazonlisting', function (req, res, next) {
    console.log("Inside amazon listing");
    var param = req.param('searchIndex');
    console.log(param);
    var values = amazonMap[param];
    console.log(values);
    var paramArry = values.split("-");
    var searchIndex = paramArry[0];
    var keyword = paramArry[1];
    var sort = paramArry[2];
    if (sort == undefined) {
        sort = 'reviewrank';
    }
    console.log(searchIndex);
    console.log(keyword);
    console.log(sort);
    var client = amazon.createClient({
        awsId: "AKIAIVW7HT56WCNWXFTA",
        awsSecret: "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",
        awsTag: "meosys-20"
    });
    client.itemSearch({
        Keywords: keyword,
        searchIndex: searchIndex,
        responseGroup: 'ItemAttributes,Images',
        sort: sort
    }, function (err, results, response) {
        if (err) {
            console.log(err);
            console.log("Response:" + response);
            console.log("Results:" + results);
        }
        else {
            var jsonResponseTxt = JSON.stringify(results);
            console.log(jsonResponseTxt);
            res.set('Content-Type', 'application/json');
            res.json(JSON.parse(jsonResponseTxt));
        }
    });
});
router.get('/', function (req, res, next) {
    console.log("Inside root");
    res.sendfile('./public/index.html');
});
module.exports = router;
//# sourceMappingURL=index.js.map