/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler()  {
  
  this.splitInput = (input) => {
    let result = [];
    const divide = input.search(/[a-zA-Z]/);
    const number = input.slice(0,divide);
    let unit = input.slice(divide).toLowerCase();
    if (unit === 'l') {
      unit = 'L';
    }
    
    // check for valid input
    if (number.search(/[^0-9.\/]/) === -1
      && number.split('.').length < 3 // numbers can only have one decimal point
      && number.search('//') === -1 // Javascript evaluates this as a comment, not an error
      //&& number.search("**") === -1
    ) {
      result.push(number === '' ? 1 : eval(number));
    } else {
      result.push('Invalid number');
    }
    
    if (unit === 'gal' || unit === 'L' || unit === 'lbs' || unit === 'kg' || unit === 'mi' || unit === 'km') {
      result.push(unit);
    } else {
      result.push('Invalid unit');
    }
    
    return result;
  };
  
  this.round = (number) => {
    return Math.round(100000*number)/100000;
  };

  this.spellOutUnit = (unit) => {
    let result;
    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'typo';
    }
    
    return result;
  };
  
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = [this.round(galToL*initNum), 'L'];
        break;
      case 'L':
        result = [this.round(initNum/galToL), 'gal'];
        break;
      case 'lbs':
        result = [this.round(lbsToKg*initNum), 'kg'];
        break;
      case 'kg':
        result = [this.round(initNum/lbsToKg), 'lbs'];
        break;
      case 'mi':
        result = [this.round(miToKm*initNum), 'km'];
        break;
      case 'km':
        result = [this.round(initNum/miToKm), 'mi'];
        break;
      default:
        result = 'typo'
    }
    
    return result;
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    return initNum + ' ' + 
      this.spellOutUnit(initUnit) + 
      ' converts to ' + 
      Math.round(returnNum*100000)/100000 + 
      ' ' + this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
