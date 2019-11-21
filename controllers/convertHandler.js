/*
*
*
*       Complete the handler logic below
*       
*       
*/

//Goals: Get everything working for correct input. Then handle incorrect inputs later.

function ConvertHandler() {
  
  //This function must check for integers, decimals, fractions, and fractions with decimals in them. This matter is complicated by the fact that we're checking a string for numericalness. 
  //RETURNS: the number or 'invalid number'
  this.getNum = function(input) {
    var possibleNumber = splitInput(input)[0]
    //By this point, no letters (US at least) will be in the first index of splitInput, only numbers and other weird stuff (maybe a - sign)
    var fractionParts = possibleNumber.split('/')
    //if it did have a fraction "/" in it
    if (fractionParts.length > 1)
    {
      if (fractionParts.length <= 2)
      { //single fraction: good
        if (isNaN(fractionParts[0]) || isNaN(fractionParts[1]) || !fractionParts[0].length || !fractionParts[1].length){ //empty or faulty numerator or denominator: bad
          return 'invalid number'
        }
        else {
          return fractionParts[0]/fractionParts[1]
        }
      }
      //multiple fractions: bad
      else return 'invalid number'
    }
    //if it didn't have a fraction then it can only be a decimal, empty (default to 1), or faulty number
    else {
      if (isNaN(fractionParts[0])) return 'invalid number'
      return fractionParts[0].length ? fractionParts[0] : 1
    }
  };
  
  //RETURNS: the unit or invalid unit'
  this.getUnit = function(input) {
    var result = splitInput(input)
    if (result.length != 1){
      result = result[1]
      var acceptable = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      for (const ele of acceptable){
        if (ele == result) return result
      }
    }
    //there could be no letters in this case, the split then is just the single number part. Or there was invalid units given.
    console.log("this was the invalid input: " + result)  
    return 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase()
    var acceptedInput = ['gal','l','mi','km','lbs','kg'];
    var expect = ['l','gal','km','mi','kg','lbs'];
    
    var found = acceptedInput.indexOf(initUnit)
    if (found != -1) return expect[found]
    return ('' + initUnit)
  };

  this.spellOutUnit = function(unit) {
    var result = '' + unit
    switch (unit){
      case 'gal':
        result = 'gallons'
        break;
      case 'l':
        result = 'liters'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'km':
        result = 'kilometers'
        break;
      case 'lbs':
        result = 'pounds'
        break;
      case 'kg':
        result = 'kilograms'
        break;
      default:
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowerCase()
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result = '';
    
    switch (initUnit){
      case 'gal':
        result = initNum * galToL
        break;
      case 'l':
        result = initNum * 1/galToL
        break;
      case 'mi':
        result = initNum * miToKm
        break;
      case 'km':
        result = initNum * 1/miToKm
        break;
      case 'lbs':
        result = initNum * lbsToKg
        break;
      case 'kg':
        result = initNum * 1/lbsToKg
        break;
      default:
        break;
    }   
    if (result) result = round(result, 5)
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var wrongNum = (initNum == 'invalid number')
    var wrongUnit = (initUnit == 'invalid unit')
    
    switch (true){
      case (wrongNum && wrongUnit):
        return "invalid number and unit"
      break;
      case (wrongNum):
        return 'invalid number'
      break;
      case (wrongUnit):
        return 'invalid unit'
      break;
      default: //everything good
        return (initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit))
      break;
    }
  };
  
  var splitInput = function(input){
    //This searches for an initial letter and splits it with anything after it from anything before it
    // var split = input.split(/([a-z].*)/i)
    // split.map(n=>(console.log(typeof(n))))
    return input.split(/([a-z].*)/i)
  }
  
  //I checked and this is the best way to round decimals due to their weird behavior in JS
  var round = function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
}

module.exports = ConvertHandler;