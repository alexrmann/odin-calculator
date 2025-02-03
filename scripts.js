// --- GLOBAL VARIABLES ---

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

let displayValue = '0';
let currentOperand = null;
let previousOperand = null;
let currentOperator = null;
let previousOperator = null;
let operation = null;
let result = null;

// --- INITIALIZE CALCULATOR ---

updateDisplay();

// --- DISPLAY FUNCTIONS ---
// 2/1/2025: In progress

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
    previousOperator = null;
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
    
    if (currentOperand == null) {
        currentOperand = value;
    } else if (currentOperand == "0") {
        currentOperand = value;
    } else {
        currentOperand = currentOperand.concat(value);
    }
    
    displayValue = currentOperand;
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

function inputOperator(value) {
    
    if (currentOperand == null) {
        displayValue = 'ERROR';
    } else if (currentOperator == null) {
        currentOperator = value;
    } else {
        previousOperator = currentOperator;
        currentOperator = value;
    }
        
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}


function inputEquals() {
    operate(currentOperator, previousOperand, currentOperand);
    displayValue = result;
    console.log(`Display: ${displayValue}\nResult: ${result}`);
}

// IN PROGRESS
function inputSign(value) {
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

function inputDecimal(value) {
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

    if (operation == 'plus') {
        result = multiply(operand1, operand2);
    } else if (operation == 'minus') {
        result = subtract(operand1, operand2);
    } else if (operation == 'divide') {
        result = divide(operand1, operand2);
    } else if (operation == 'add') {
        result = add(operand1, operand2);
    }

    console.log(result);
    return result;
}

/* ~~~ ARITHMETIC ~~~ 

All functions return undefined.

*/


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