const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

beforeEach(function (done) {
    mongoose.connection.collections.authors.drop(() => {
        done();
    });
});

//Describe our test
describe('Nesting records', function () {

    // Create Tests
    it('Creates an author with sub-documents', function (done) {
        let pat = new Author({
            name: 'Patrick Rofthuss',
            books: [{ title: 'Name of the Wind', pages: 400 }]
        });

        pat.save().then(() => {
            Author.findOne({ name: 'Patrick Rofthuss' }).then((record) => {
                assert(record.books.length === 1);
                done();
            });
        });
    });

    it ('Adds a book to an author', function(done) {
        let pat = new Author({
            name: 'Patrick Rofthuss',
            books: [{title: 'Name of the Wind', pages: 400}]
        });

        pat.save().then(() => {
            Author.findOne({name: 'Patrick Rofthuss'}).then((record) => {
                // add a book to the books array
                record.books.push({title: 'Wise Man\'s Fear', pages: 500});
                record.save().then(() => {
                    Author.findOne({name: 'Patrick Rofthuss'}).then((result) => {
                        assert(record.books.length === 2);
                        done();
                    });
                })

            });
        });
    });
});