var should = require('should'),
    _ = require('underscore'),
    async = require('async'),
    config = require('../lib/config')(),
    utility = require('../lib/utility')();

describe('config', function() {
  describe('format', function() {
    it('format', function() {
      _.isNull(config.teamwork).should.eql(false);
      _.isObject(config.teamwork).should.eql(true);
      _.isNull(config.teamwork.key).should.eql(false);
      _.isString(config.teamwork.key).should.eql(true);
      _.isNull(config.teamwork.company).should.eql(false);
      _.isString(config.teamwork.company).should.eql(true);
    });
  });
});

describe('utility', function() {
  describe('send', function() {
    it('success', function(done) {
      utility.send('/account.json', 'GET', function(data) {
        data = JSON.parse(data);
        data.MESSAGE.should.eql('Access Denied');
        data.STATUS.should.eql('Error');
        done();
      });
    });
  });
});
