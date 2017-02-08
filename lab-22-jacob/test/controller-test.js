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
});
//
// describe('#submit', () => {
//   it('should add a cow to history', () => {
//     let expected = '\n' + cowsay.say({text: 'Hello', f: this.cowsayCtrl.current})
//     this.cowsayCtrl.text = 'Hello'
//     this.cowsayCtrl.submit()
//     expect(this.cowsawCtrl.newCow).to()
//   })
// })
