module.exports = function() {
  var _ = require('underscore'),
      events = require('events'),
      sprintf = require('sprintf');

  var _utility = require('../utility')();

  var Project = function(data) { 
    if (_.isNull(data) === false) {
      this.data = data;
    }
    this._type = 'Teamwork.Project';
  };
  Project.prototype = new events.EventEmitter;

  // return a single proejct, emit 'data' event when data ready
  Project.prototype.load = function(id) {
    var _self = this;
    _utility.send(sprintf('/projects/%d.json', id), 'GET', function(chunk) {
      _self.data = JSON.parse(chunk);
      _self.emit('data');
    });

    return _self;
  };

  Project.prototype.getName = function() {
    if (_.isObject(this.data) === false) {
      throw new Error('Data is not available');
    }
    return this.data.project.name;
  };

  return Project;
};