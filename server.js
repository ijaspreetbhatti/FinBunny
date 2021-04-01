const express = require('express');
const app = express();
const port = 3000;
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

mongoURL = 'mongodb://localhost:27017/';

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getincomes', (req, res) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        db.db('FinBunny').collection("incomes").find().toArray((err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            db.close();
        })
    })
})

app.get('/getexpenses', (req, res) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        db.db('FinBunny').collection("expenses").find().toArray((err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            db.close();
        })
    })
})

app.get('/getmetadata', (req, res) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        db.db('FinBunny').collection("metadata").findOne({}, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send(data);
            db.close();
        })
    })
})

app.post('/addincome', (req, res) => {
    console.log(req);
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        db.db('FinBunny').collection("incomes").insertOne(req.body, (err, response) => {
            if (err) throw err;
            console.log(response);
            res.send(response);
            db.close();
        })
    })
})

app.post('/addexpense', (req, res) => {
    MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        db.db('FinBunny').collection("expenses").insertOne(req.body, (err, response) => {
            if (err) throw err;
            console.log(response);
            res.send(response);
            db.close();
        })
    })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})


