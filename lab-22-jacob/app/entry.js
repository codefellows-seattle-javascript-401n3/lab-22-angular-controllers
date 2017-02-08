'use strict';

// I will want to require ('./scss/reset.scss')
require('./scss/main.scss');
const cowsay = require('cowsay-browser');
const angular = require('angular');

const demoApp = angular.module('demoApp', []); //[] is for dependencies

demoApp.controller('CowsayController', ['$log', CowsayController]); //CowsayController is pointing to constructor function below
//log is debug stuff
//scope links us back to variables we had before

function CowsayController($log) { //angular is taking care of dependency injection behind scenes
  let self = this;
  self.title = 'Cows Say the Darndest Things', //I should set a variable to 'this'. like self = this
  self.history = [];
  self.list = [];

  cowsay.list((err, cowfiles) => {
    self.list = cowfiles;
    self.currentCow = self.list[0];
  });

  self.updateCow = function(input) {
    return '\n' + cowsay.say({text: input, f: self.currentCow});
  },

  self.submit = function(input) { //thank you angular docs.
    let statement = cowsay.say({text: input, f: self.currentCow});
    self.history.push(statement);
    return self.history;
  };

  self.undo = function() {
    this.history.pop();
  };
}
