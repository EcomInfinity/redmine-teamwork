module.exports = function() {
  var _ = require('underscore'),
      events = require('events');

  var _utility = require('../utility')(),
      Project = require('./project')();

  var Projects = function() { this._type = 'Teamwork.Projects'; };
  Projects.prototype = new events.EventEmitter;

  // return all projects meet the options, emit 'data' event when data ready
  Projects.prototype.load = function(options) {
    var _self = this;

    var _data;

    _utility.send('/projects.json', 'GET', function(chunk) {
      _data = JSON.parse(chunk);
      if (_data.STATUS === 'OK') {
        _self.emit('_data');  
      }
    });

    _self.on('_data', function() {
      var _projects = [];

      _.each(_data.projects, function(val) {
        _projects.push(new Project(val));
      });

      _self.emit('data', _projects);
    });

    return this;
  };

  return Projects;
};