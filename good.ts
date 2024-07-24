class Calculator {
    private displayValue: string;
    private firstOperand: number | null;
    private waitingForSecondOperand: boolean;
    private operator: string | null;

    constructor() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    }

    public inputDigit(digit: string): void {
        const { displayValue, waitingForSecondOperand } = this;
        if (waitingForSecondOperand === true) {
            this.displayValue = digit;
            this.waitingForSecondOperand = false;
        } else {
            this.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    public inputDecimal(dot: string): void {
        if (this.waitingForSecondOperand === true) {
            this.displayValue = '0.';
            this.waitingForSecondOperand = false;
            return;
        }
        if (!this.displayValue.includes(dot)) {
            this.displayValue += dot;
        }
    }

    public handleOperator(nextOperator: string): void {
        const { firstOperand, displayValue, operator } = this;
        const inputValue = parseFloat(displayValue);

        if (operator && this.waitingForSecondOperand) {
            this.operator = nextOperator;
            return;
        }

        if (firstOperand == null) {
            this.firstOperand = inputValue;
        } else if (operator) {
            const currentValue = firstOperand || 0;
            const result = this.performCalculation(operator, currentValue, inputValue);

            this.displayValue = String(result);
            this.firstOperand = result;
        }

        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
    }

    public performCalculation(operator: string, firstOperand: number, secondOperand: number): number {
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
    }

    public resetCalculator(): void {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    }

    public updateDisplay(): void {
        const display = document.querySelector('.calculator-screen') as HTMLInputElement;
        display.value = this.displayValue;
    }
}

const calculator = new Calculator();

const keys = document.querySelector('.calculator-keys')!;
keys.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
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
