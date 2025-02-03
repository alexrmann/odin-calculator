// --- ADDITION ---

function add(x,y) {
	let sum = x + y;
	console.log(sum);
    return sum;
}
// returns undefined

// add(3,4);
// 7
// returns undefined


// --- SUBTRACTION ---

function subtract(x,y) {
	let difference = x - y;
	console.log(difference);
    return difference;
}
// returns undefined

// subtract(10, 6);
// 4
// returns undefined


// --- MULTIPLICATION ---

function multiply(x,y) {
	let product = x * y;
	console.log(product);
    return product;
}
// returns undefined

// multiply(3, 2);
// 6
// returns undefined


// --- DIVISION ---

function divide(x, y) {
	let quotient = x / y;
	console.log(quotient);
    return quotient;
}
// returns undefined

// divide(10, 5);
// 2
// returns undefined


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
        } else if (buttons[i].id == 'clear')
            clearDisplay();
            updateDisplay();
    });
}

function inputOperand(value) {

    // 2/2/2025: Need to remove bug where pressing 'Zero' button results in a leading '0' on the display.
    
    if (currentOperand == null) {
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
    }   else if (currentOperator == null) {
        currentOperator = value;
    }
        else {
        previousOperator = currentOperator;
        currentOperator = value;
    }
        
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}


function inputEquals() {
    operate(currentOperator, firstOperand, lastOperand);
    displayValue = result;
    console.log(`Display: ${displayValue}`);
}

// IN PROGRESS
function inputSign(value) {
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}
function inputDecimal(value) {
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

// --- OPERATE ---
// 1/27/2025: This section in progress. 

function operate(operation, operand1, operand2) {

    if (operation == 'plus') {
        result = multiply(operand1, operand2);
    } else if (operation == 'divide') {
        result = divide(operand1, operand2);
    } else if (operation == 'add') {
        result = add(operand1, operand2);
    } else {
        result = subtract(operand1, operand2);
    }

    console.log(result);
    return result;
}