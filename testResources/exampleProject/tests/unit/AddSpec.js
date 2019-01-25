const { add, addOne, negate, isNegativeNumber } = require('../../src/Add');

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('Add', function() {
    it('should be able to add two numbers', function() {
      var num1 = 2;
      var num2 = 5;
      var expected = num1 + num2;
  
      var actual = add(num1, num2);
  
      expect(actual).to.eq(expected);
    });
  
    it('should be able to add one to a number', function() {
      var number = 2;
      var expected = 3;
  
      var actual = addOne(number);
  
      expect(actual).to.eq(expected);
    });
  
    it('should be able negate a number', function() {
      var number = 2;
      var expected = -2;
  
      var actual = negate(number);
  
      expect(actual).to.eq(expected);
    });
  
    it('should be able to recognize a negative number', function() {
      var number = -2;
  
      var isNegative = isNegativeNumber(number);
  
      expect(isNegative).to.eq(true);
    });
  
    it('should be able to recognize that 0 is not a negative number', function() {
      var number = 0;
  
      var isNegative = isNegativeNumber(number);
  
      expect(isNegative).to.eq(false);
    });
});
