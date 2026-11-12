const expect = require('chai').expect;
const Calculator = require('../../src/js/lib/calculator');

describe('Calculator', () => {
  let calculator = null;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should have an add function', () => {
    expect(calculator.add).to.exist;
  });

  it('should add 2 + 2 together correctly', () => {
    expect(calculator.add(2, 2)).to.equal(4);
  });

  it('should have a subtract function', () => {
    expect(calculator.subtract).to.exist;
  });

  it('should subtract 2 - 2 correctly', () => {
    expect(calculator.subtract(2, 2)).to.equal(0);
  });

  it('should have a multiply function', () => {
    expect(calculator.multiply).to.exist;
  });

  it('should multiply 2 * 2 together correctly', () => {
    expect(calculator.multiply(2, 2)).to.equal(4);
  });

  it('should have a divide function', () => {
    expect(calculator.divide).to.exist;
  });

  it('should divide 2 / 2 correctly', () => {
    expect(calculator.divide(2, 2)).to.equal(1);
  });
});