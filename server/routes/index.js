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
var bestBuyMap = null;
var walmartMap = null;
walmartMap = {
    'Laptops': 'Laptop-3944_3951_1089430',
    'Desktop': 'Desktop-3944_3951_132982',
    'Cell Phones': 'Cell Phones-1105910_1231203',
    'Televisions': 'TV-3944_1060825_447913',
    'Camera': 'Camera-3944_133277',
    'Books': 'Books-3920',
    'VideoGames': 'Video Games-2636',
    'Apps': '',
    'Movies': 'Movies-4096',
    'Songs': 'Music-4104',
    'Music Videos': 'Music-4104_538232_101914',
    'Audio Books': 'Books-3920_555552'
};
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
bestBuyMap = {
    'Laptops': 'abcat0502000',
    'Desktop': 'abcat0501000',
    'Cell Phones': 'pcmcat209400050001',
    'Televisions': 'abcat0101000',
    'Camera': 'abcat0401000',
    'Books': '',
    'VideoGames': '',
    'Apps': '',
    'Movies': '',
    'Songs': '',
    'Music Videos': '',
    'Audio Books': ''
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
router.get('/walmartlisting', function (req, res, next) {
    console.log("Inside walmart listing");
    var param = req.param('searchIndex');
    console.log(param);
    var searchIndex = walmartMap[param];
    var paramArry = searchIndex.split("-");
    console.log(searchIndex);
    request('http://api.walmartlabs.com/v1/search?query=' + paramArry[0] + '&format=json&' +
        'categoryId=' + paramArry[1] + '&apiKey=ve3qcwh6dg4by7akjq7kxg97&sort=bestseller&numItems=25', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.set('Content-Type', 'application/json');
            res.json(JSON.parse(body));
        }
    });
});
router.get('/bestbuylisting', function (req, res, next) {
    console.log("Inside best buy listing");
    var param = req.param('searchIndex');
    console.log(param);
    var searchIndex = bestBuyMap[param];
    console.log(searchIndex);
    request('https://api.bestbuy.com/v1/products(customerReviewCount>100&(categoryPath.id=' + searchIndex + '))?apiKey=m14CIg2ti3ZpmV9eGtMKumlW' +
        '&sort=bestSellingRank.asc&show=bestSellingRank,condition,description,details.name,details.value,features.feature,image,' +
        'longDescription,manufacturer,mobileUrl,modelNumber,name,onSale,regularPrice,salePrice,shipping,shippingCost,' +
        'shortDescription,sku,thumbnailImage,type,upc,url&pageSize=20&format=json', function (error, response, body) {
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