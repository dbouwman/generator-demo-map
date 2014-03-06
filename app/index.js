'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var DemoMapGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
        this.bowerInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Demo Map generator.'));

    var prompts = [
      {
        name: 'appName',
        message: 'What is the name of this app?'
      },
      {
        name: 'authorName',
        message: 'What is your name? (for package.json)'
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.authorName = props.authorName;
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('lib');
    this.mkdir('styles');
    
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');

  },

  projectfiles: function () {
    this.template('_index.html', 'index.html');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('app.js', 'app.js');
    this.copy('main.styl', 'main.styl');
    this.copy('lib/bootstrap.css', 'lib/bootstrap.css');
    this.copy('lib/favicon.ico', 'lib/favicon.ico');
    this.copy('lib/grey_wash_wall.png', 'lib/grey_wash_wall.png');
    this.copy('styles/responsive.styl', 'styles/responsive.styl');
    this.copy('jshintrc', '.jshintrc');
    this.copy('.bowerrc', '.bowerrc');
  }
});

module.exports = DemoMapGenerator;