const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDb Server');
    const db = client.db('TodoApp');

    // //deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // //deleteOne
    // db.collection('Todos').deleteOne({ test: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });
    //findOneAndDelete

    db.collection('Todos').findOneAndDelete({
        _id: new ObjectID("5ab507fa8f60269a936eecdc")
    }).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    });

    client.close();
});