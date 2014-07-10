var session = require('../../api/policies/sessionAuth'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The session Auth', function () {

    describe('session Auth', function () {
        it ('seesion not null', function () {
            assert.notEqual(session, null);
        });
    });

});