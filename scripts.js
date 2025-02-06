// --- GLOBAL VARIABLES ---

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

let displayValue = '0';
let currentOperand = null;
let previousOperand = null;
let currentOperator = null;
let result = null;

let operationSwitch = false; // Initialize the operation switch

// --- INITIALIZE CALCULATOR ---

updateDisplay();

// --- DISPLAY FUNCTIONS ---

function updateDisplay() {
    // Update the display
    display.innerText = displayValue;

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
            inputSign();
            updateDisplay();
        } else if (buttons[i].id == 'delete') {
            inputDelete();
            updateDisplay();
        } else if (buttons[i].id == 'clear') {
            clearDisplay();
            updateDisplay();
        }    
    });
}

function inputOperand(value) {

    // Testing operationSwitch logic
    if (currentOperand == null) {
        currentOperand = value;
        operationSwitch = false;
    } else {
        if (operationSwitch == true) { // The operation switch prevents concatenation after an operation has been performed.
            currentOperand = value;
            operationSwitch = false;
        } else {
            if (currentOperand == "0") {
                currentOperand = value;
            } else {
                currentOperand = currentOperand.concat(value);
            }
        }
    }

    displayValue = currentOperand;
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
        }

        currentOperator = value;
        currentOperand = null;
    } 

}


function inputEquals() {
    operate(currentOperator, Number(previousOperand), Number(currentOperand));
    displayValue = result;
}

// IN PROGRESS
function inputSign() {
    if (Math.sign(currentOperand) >= 0) {
        currentOperand = -Math.abs(currentOperand);
    } else {
        currentOperand = Math.abs(currentOperand);
    }

    displayValue = currentOperand;
}

function inputDecimal(value) {
    currentOperand = currentOperand.concat(value);
    displayValue = currentOperand;
}

function inputDelete() {
    if (operationSwitch == true) {
        clearDisplay();
        operationSwitch = false;
    } else {
        if (currentOperand.length == 1) {
            currentOperand = null;
            displayValue = "0";
        } else {
            currentOperand = currentOperand.substring(0, currentOperand.length - 1);
            displayValue = currentOperand;
        }
    }
}

// --- OPERATE --- 

function operate(operation, operand1, operand2) {
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
                if(operand2 === 0) {
                    result = "ERROR DIV 0";
                    break;
                } else {
                    result = divide(operand1, operand2);
                }
        }
    }

    // Set globals for next operation
    if (result == "ERROR DIV 0") { // This only displays after hitting the Equals button or inputting a new operator.
        currentOperand = null;
    } else if (result.toString().length > 12) {
        result = result.toExponential(4); // This will handle most cases with sufficient info, but it results in less accuracy.
        currentOperand = result;
    } else {
        result = result.toString();
        currentOperand = result;
    }

    previousOperand = null;
    currentOperator = null;
    operationSwitch = true;
 
    return result;
}

/* ~~~ ARITHMETIC ~~~ */

// --- Addition ---

function add(x,y) {
	let sum = x + y;
    return sum;
}

// --- Subtraction ---

function subtract(x,y) {
	let difference = x - y;
    return difference;
}

// --- Multiplication ---

function multiply(x,y) {
	let product = x * y;
    return product;
}

// --- Division ---

function divide(x, y) {
	let quotient = x / y;
    return quotient;
}