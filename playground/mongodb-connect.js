// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDb Server');
    const db = client.db('TodoApp');

    // db.collection('Users').insertOne({
    //     name:'andy',
    //     age:23,
    //     location: 'Buc'
    // }, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //   });

    // db.collection('Todos').find({
    //     _id:new ObjectID("5ab4f241bfa53c1a8ca9e8c8")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch totos', err);
    // })

    db.collection('Users').find({name:'andy'}).count().then((count) => {
        console.log(`Todos count : ${count}`);
    }, (err) => {
        console.log('Unable to fetch totos', err);
    });

    client.close();
});