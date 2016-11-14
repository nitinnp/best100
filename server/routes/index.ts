'use strict';

import * as express from 'express';

var path = require('path');
let router = express.Router();
var amazon = require('amazon-product-api');
var xml = require('xml');
var util = require('util');


    router.get('/amazonlisting', function (req, res, next) {
    console.log("Inside amazon listing");
    var searchIndex = req.param('searchIndex');
    var keyword = req.param('keyword');

        console.log(searchIndex);
        console.log(keyword);

    var client = amazon.createClient({
        awsId: "AKIAIVW7HT56WCNWXFTA",
        awsSecret: "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",
        awsTag: "meosys-20"
    });

    client.itemSearch({
        Keywords: keyword,
        searchIndex: searchIndex,
        responseGroup: 'ItemAttributes,Images',
        sort: 'reviewrank'
    }, function (err, results, response) {
        if (err) {
            console.log(err);
        } else {

            var jsonResponseTxt = JSON.stringify(results);
            //console.log(jsonResponseTxt);
            res.set('Content-Type', 'application/json');
            res.json(JSON.parse(jsonResponseTxt));
        }
    });


});


router.get('/', function (req, res, next) {
    console.log("Inside root");
    res.sendfile('./public/index.html');
});


export = router;