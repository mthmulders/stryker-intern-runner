const { add, addOne } = require('../../src/Add');

const { describe, it } = intern.getPlugin('interface.bdd');
const { expect } = intern.getPlugin('chai');

describe('Add', function() {
    it('should be able to add two numbers and add one', function() {
        var num1 = 2;
        var num2 = 5;
        var expected = num1 + num2 + 1;
        
        var actual = add(num1, num2);
        
        expect(actual).to.eq(expected);
    });
    
    it('should be to add able 1 to a number and actually add 2', function() {
        var num = 2;
        var expected = 4;
  
        var actual = addOne(num);
        
        expect(actual).to.eq(expected);
    });
});
