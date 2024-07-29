
// Set Initial Values
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

// Set Buttons to All Button Elements
const buttons = document.querySelectorAll('button');

// Logic for Updating Display Screen (up to 10 characters)
function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if (displayValue.length > 10) {
        display.innerText = displayValue.substring(0, 10);
    }
}
updateDisplay();

// Logic for Display Updates in Response to Button Presses
function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if (buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if (buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if (buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if (buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        }
    )}
}
clickButton();

// Logic to Handle Operator Input and Click Order
function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundNumber(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundNumber(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

// Logic to Handle Operand Input and Click Order
function inputOperand(operand) {
    if (firstOperator === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

// Calculation Display Logic
function inputEquals() {
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = roundNumber(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundNumber(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
    }
}

function inputPercent(num) {
    displayValue = (num / 100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function inputDecimal(period) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += period;
    } else if (!displayValue.includes(period)) {
        displayValue += period;
    } 
}

function operate(x, y, oper) {
    if (oper === '+') {
        return x + y;
    } else if (oper === '-') {
        return x - y;
    } else if (oper === '*') {
        return x * y;
    } else if (oper === '/') {
        return x / y;
    }
}

function roundNumber(num, placement) {
    return parseFloat(Math.round(num + 'e' + placement) + 'e-' + placement);
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}
