const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDb Server');
    const db = client.db('TodoApp');

    db.collection('Users').find({name:'andy'}).count().then((count) => {
        console.log(`Todos count : ${count}`);
    }, (err) => {
        console.log('Unable to fetch totos', err);
    });

    client.close();
});