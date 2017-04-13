var express = require('express');
var router = express.Router();

/* GET index page*/
router.post('/', function(req, res, next) {

    let name = req.body.name;
    let category = req.body.category;
    let lat = Number(req.body.lat);
    let long = Number(req.body.long);

    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/MWA", function(err, db) {
        if (err) {
            res.render('error', { title: 'Error', error: err }, function(err, html) {
                if (err)
                    throw err;
                res.end(html);
            });
        }

        var doc = { name: name, category: category, location: [long, lat] };
        db.collection('points').insert(doc, function(err, docInserted) {
            if (err) throw err;
            db.close();
            res.render('insert', doc, function(err, doc) {
                if (err)
                    throw err;
                res.end(doc);
            });
        });
    });
});

module.exports = router;