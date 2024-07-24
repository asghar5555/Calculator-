let Calculator = /** @class */ (function () {
    function Calculator() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    }
    Calculator.prototype.inputDigit = function (digit) {
       let _a = this, displayValue = _a.displayValue, waitingForSecondOperand = _a.waitingForSecondOperand;
        if (waitingForSecondOperand === true) {
            this.displayValue = digit;
            this.waitingForSecondOperand = false;
        }
        else {
            this.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    };
    Calculator.prototype.inputDecimal = function (dot) {
        if (this.waitingForSecondOperand === true) {
            this.displayValue = '0.';
            this.waitingForSecondOperand = false;
            return;
        }
        if (!this.displayValue.includes(dot)) {
            this.displayValue += dot;
        }
    };
    Calculator.prototype.handleOperator = function (nextOperator) {
        let _a = this, firstOperand = _a.firstOperand, displayValue = _a.displayValue, operator = _a.operator;
        let inputValue = parseFloat(displayValue);
        if (operator && this.waitingForSecondOperand) {
            this.operator = nextOperator;
            return;
        }
        if (firstOperand == null) {
            this.firstOperand = inputValue;
        }
        else if (operator) {
           let currentValue = firstOperand || 0;
            let result = this.performCalculation(operator, currentValue, inputValue);
            this.displayValue = String(result);
            this.firstOperand = result;
        }
        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
    };
    Calculator.prototype.performCalculation = function (operator, firstOperand, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    };
    Calculator.prototype.resetCalculator = function () {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    };
    Calculator.prototype.updateDisplay = function () {
        let display = document.querySelector('.calculator-screen');
        display.value = this.displayValue;
    };
    return Calculator;
}());
  let calculator = new Calculator();
  let keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', function (event) {
    let target = event.target;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        calculator.handleOperator(target.value);
        calculator.updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        calculator.inputDecimal(target.value);
        calculator.updateDisplay();
        return;
    }
    if (target.classList.contains('all-clear')) {
        calculator.resetCalculator();
        calculator.updateDisplay();
        return;
    }
    calculator.inputDigit(target.value);
    calculator.updateDisplay();
});
