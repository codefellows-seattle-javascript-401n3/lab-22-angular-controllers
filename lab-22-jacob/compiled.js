'use strict';

// I will want to require ('./scss/reset.scss')

require('./scss/main.scss');
var cowsay = require('cowsay-browser');
var angular = require('angular');

var demoApp = angular.module('demoApp', []); //[] is for dependencies

demoApp.controller('CowsayController', ['$log', CowsayController]); //CowsayController is pointing to constructor function below
//log is debug stuff
//scope links us back to variables we had before

function CowsayController($log) {
  //angular is taking care of dependency injection behind scenes
  var self = this;
  self.title = 'Moooooo', //I should set a variable to 'this'. like self = this
  self.history = [];
  self.list = [];

  cowsay.list(function (err, cowfiles) {
    self.list = cowfiles;
    self.currentCow = self.list[0];
  });

  self.updateCow = function (input) {
    return '\n' + cowsay.say({ text: input, f: self.currentCow });
  }, self.submit = function (input) {
    //thank you angular docs.
    var statement = cowsay.say({ text: input, f: self.currentCow });
    self.history.push(statement);
    return self.history;
  };
  self.undo = function () {
    this.history.pop();
  };
};

self.displayAnimal = function (animal) {
  return '\n' + cowsay.say({ text: this.text, f: animal });
};
