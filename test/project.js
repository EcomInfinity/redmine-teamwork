var should = require('should'),
    _ = require('underscore'),
    config = require('../lib/config')(),
    Project = require('../lib/teamwork/project')(),
    Projects = require('../lib/teamwork/projects')();

describe('project', function() {
  it('plain init', function() {
    var p = new Project();
    p._type.should.eql('Teamwork.Project');
  });

  it('load', function(done) {
    var project = new Project();
    project.load(config.teamwork.expected.id);
    project.on('data', function() {
      _.isObject(project.data).should.eql(true);
      project.getName().should.eql(config.teamwork.expected.name);
      done();
    });
  });

  it('data not available', function() {
    var p = new Project();
    (function() { p.getName(); }).should.throw('Data is not available');
  });
});

describe('projects', function() {
  it('load', function() {

  });
});