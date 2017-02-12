'use strict';

require('../app/entry.js');
require('angular-mocks');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });
  describe('initial properties', () => {
    it('title property should equal\'Cows Say the Darndest Things\'', () => {
      expect(this.cowsayCtrl.title).toBe('Cows Say the Darndest Things');
    });
    it('history should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
      expect(this.cowsayCtrl.history.length).toBe(0);
    });
    it('the controller\'s list property should be the same as cowsay as cowfiles.list', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.list).toEqual(list);
        expect(this.cowsayCtrl.currentCow).toEqual(list[0]);
      });
    });
  });
  describe('#updateCow', () => {
    it('should return a cowfile with a given input', () => {
      let expected = '\n' + cowsay.say({text: 'moo', f: this.cowsayCtrl.currentCow});
      let updatedCow = this.cowsayCtrl.updateCow('moo');
      expect(updatedCow).toEqual(expected);
    });
  });
  describe('#submit', () => {
    it('should add a cow to history', () => {
      let expected = cowsay.say({text: 'moo', f: this.cowsayCtrl.currentCow});
      let submittedCow = this.cowsayCtrl.submit('moo');
      expect(submittedCow).toEqual(expected);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });
  describe('#undo', () => {
    it('should remove the most recent cow from the history', () => {
      let expected = cowsay.say({text: 'moo', f: this.cowsayCtrl.currentCow});
      let normalCow = this.cowsayCtrl.submit('moo');
      let unexpected = this.cowsayCtrl.submit('meow');
      expect(this.cowsayCtrl.history.length).toBe(2);
      expect(this.cowsayCtrl.history[1]).toEqual(unexpected);
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.history.length).toBe(1);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });
});
