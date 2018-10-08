const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to the database before test runs
before((done) => {
    //Connect to mongodb
    mongoose.connect('mongodb://localhost/testaroo');

    mongoose.connection.once('open', function () {
        console.log('Connection has been made, now make fireworks.........');
        done();
    }).on('error', function (error) {
        console.log('Connection error:', error);
    });
});

//Drop the characters collection before each test
beforeEach((done) => {
    // Drop the collection
    mongoose.connection.collections.mariochars.drop(() => {
        done();
    });
});
