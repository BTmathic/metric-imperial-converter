/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  
  suite('Function convertHandler.splitInput(input) number', () => {
    
    test('Whole number input', (done) => {
      const input = '32L';
      assert.equal(convertHandler.splitInput(input)[0], 32);
      done();
    });
    
    test('Decimal Input', (done) => {
      const input = '3.2L';
      assert.equal(convertHandler.splitInput(input)[0], 3.2);
      done();
    });
    
    test('Fractional Input', (done) => {
      const input = '3/2L';
      assert.equal(convertHandler.splitInput(input)[0], 3/2);
      done();
    });
    
    test('Fractional Input w/ Decimal', (done) => {
      const input = '1.2/3L';
      assert.equal(convertHandler.splitInput(input)[0], 1.2/3);
      done();
    });
    
    test('Invalid Input (double fraction)', (done) => {
      const input = '3//2L';
      assert.equal(convertHandler.splitInput(input)[0], 'Invalid number');
      done();
    });
    
    test('No Numerical Input', (done) => {
      const input = 'L';
      assert.equal(convertHandler.splitInput(input)[0], 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.splitInput(input) units', () => {
    
    test('For Each Valid Unit Inputs', (done) => {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      const expect = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((ele) => {
        assert.equal(convertHandler.splitInput(ele)[1], expect[input.indexOf(ele) % 6]);
      });
      done();
    });
    
    test('Unknown Unit Input', (done) => {
      const input = '32d';
      assert.equal(convertHandler.splitInput(input)[1], 'Invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.convert(initNum, initUnit)', () => {
    
    test('For Each Valid Unit Inputs', (done) => {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.convert(1, ele)[1], expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', () => {
    
    test('Gal to L', (done) => {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', (done) => {
      const input = [5, 'L'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
      done();
    });
    
    test('Mi to Km', (done) => {
      const input = [10, 'mi'];
      const expected = 16.0934;
      assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
      done();
    });
    
    test('Km to Mi', (done) => {
      const input = [10, 'km'];
      const expected = 6.21373;
      assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', (done) => {
      const input = [10, 'lbs'];
      const expected = 4.53592;
      assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', (done) => {
      const input = [10, 'kg'];
      const expected = 22.04624;
      assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
      done();
    });
    
  });

});