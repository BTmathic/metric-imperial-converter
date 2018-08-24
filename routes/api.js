/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      let response;
      const input = req.query.input;
      const [initNum, initUnit] = convertHandler.splitInput(input);
      // error handle bad input
    
      if (initNum === 'Invalid number') {
        if (initUnit === 'Invalid unit') {
          response = 'invalid number and unit';
        } else {
          response = 'invalid number';
        }
      } else if (initUnit === 'Invalid unit') {
        response = 'invalid unit';
      }
    
      if (!response) { // if there is an error in the input the conversion should not be attempted
        const [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit);
        const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        response = {initNum, initUnit, returnNum, returnUnit, toString};
      }
      
      res.send(response);
    }
  );  
};
