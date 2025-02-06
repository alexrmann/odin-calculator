// --- GLOBAL VARIABLES ---

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

let displayValue = '0';
let currentOperand = null;
let previousOperand = null;
let currentOperator = null;
let result = null;

// --- INITIALIZE CALCULATOR ---

updateDisplay();

// --- DISPLAY FUNCTIONS ---

function updateDisplay() {
    // Update the display
    display.innerText = displayValue;

    // 2/5/2025
    // Substring not working with results--only input.

    // Prevent display text overflow
    if (displayValue.length > 12) {
        display.innerText = displayValue.substring(0, 12);
    }
}

function clearDisplay() {
    displayValue = "0";
    currentOperand = null;
    previousOperand = null;
    currentOperator = null;
    result = null;
}

// --- INTERACTIVITY ---

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        if (buttons[i].classList.contains('digit')) {
            inputOperand(buttons[i].value);
            updateDisplay();
        } else if (buttons[i].classList.contains('operator')) {
            inputOperator(buttons[i].value);
            updateDisplay();
        } else if (buttons[i].id == 'equals') {
            inputEquals();
            updateDisplay();
        } else if (buttons[i].id == 'decimal') {
            inputDecimal(buttons[i].value);
            updateDisplay();
        } else if (buttons[i].id == 'sign') {
            inputSign(displayValue);
            updateDisplay();
        } else if (buttons[i].id == 'delete') {
            inputDelete();
            updateDisplay();
        } else if (buttons[i].id == 'clear')
            clearDisplay();
            updateDisplay();
    });
}

function inputOperand(value) {

    if (currentOperand == null || currentOperand == "0") {
        currentOperand = value;
    } else {
        currentOperand = currentOperand.concat(value);
    }

    displayValue = currentOperand;
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

function inputOperator(value) {
    
    if (currentOperator == null) {
        switch(currentOperand) {
            case null:    
                break;
            default: 
                previousOperand = currentOperand;
                currentOperand = null;
                currentOperator = value; 
        }
    } else {
        if (previousOperand == null) {
            previousOperand = currentOperand;
        } else {
            operate(currentOperator, Number(previousOperand), Number(currentOperand));
            displayValue = result;
            previousOperand = result;
            console.log(previousOperand);
        }

        currentOperator = value;
        currentOperand = null;
    } 

    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}


function inputEquals() {
    operate(currentOperator, Number(previousOperand), Number(currentOperand));
    displayValue = result;
    console.log(`Display: ${displayValue}\nResult: ${result}`);
}

// IN PROGRESS
function inputSign(value) {
    if (Math.sign(currentOperand) >= 0) {
        currentOperand = -Math.abs(currentOperand);
    } else {
        currentOperand = Math.abs(currentOperand);
    }

    displayValue = currentOperand;
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

function inputDecimal(value) {
    currentOperand = currentOperand.concat(value);
    displayValue = currentOperand;
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

function inputDelete() {

    if (currentOperand.length == 1) {
        currentOperand = null;
        displayValue = "0";
    } else {
        currentOperand = currentOperand.substring(0, currentOperand.length - 1);
        displayValue = currentOperand;
    }

    console.log(`Display: ${displayValue}\nCurrent Operand: ${currentOperand}`);
}

// --- OPERATE --- 

function operate(operation, operand1, operand2) {

    console.log(`Operation: ${operation}\nFirst Operand: ${operand1}\nSecond Operand: ${operand2}`);
    if (previousOperand == null) {
        switch(currentOperand) {
            case null: // If equals is pressed when no current operand, display zero.
                result = 0;
                break;
            default:
                result = currentOperand;
        }
    } else {
        switch(operation) {
            case 'plus':
                result = add(operand1, operand2);
                break;
            case 'minus':
                result = subtract(operand1, operand2);
                break;
            case 'times':
                result = multiply(operand1, operand2);
                break;
            case 'divide':
                if(operand2 == 0) {
                    result = "ERROR DIV 0";
                    break;
                } else {
                    result = divide(operand1, operand2);
                }
        }
    }
    
    // Set globals for next operation
    if (result == "ERROR DIV 0") {
        currentOperand = null;
    } else {
        currentOperand = result;
    }
    previousOperand = null;
    currentOperator = null;
    
    result = result.toString();

    return result;
}

/* ~~~ ARITHMETIC ~~~ */

// --- Addition ---

function add(x,y) {
	let sum = x + y;
	console.log(sum);
    return sum;
}

// --- Subtraction ---

function subtract(x,y) {
	let difference = x - y;
	console.log(difference);
    return difference;
}

// --- Multiplication ---

function multiply(x,y) {
	let product = x * y;
	console.log(product);
    return product;
}

// --- Division ---

function divide(x, y) {
	let quotient = x / y;
	console.log(quotient);
    return quotient;
}