// const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar')

describe('Saving records', function() {
    // Create tests
    it('Saves a record to the database', function(done) {
        var char = new MarioChar({
            name: 'Mario'
        });

        char.save().then(() => {
            assert(char.isNew === false);//if it saved to data base, means that char is not new anymore, and then it should be false
            done();
        });
    })
})