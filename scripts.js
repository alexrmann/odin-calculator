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
    
    // 2/2/2025
    // Need to fix bug where after pressing operator button, the next digit pressed results in concatenation to the previous operand

    if (currentOperand == null || currentOperand == "0") {
        currentOperand = value;
    } else if (previousOperand == null && (currentOperand != null || currentOperand == "0")) {
        previousOperand = currentOperand;
        currentOperand = value;
    } else {
        currentOperand = currentOperand.concat(value);
    }

    displayValue = currentOperand;
    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}

function inputOperator(value) {

    // NEED TO RESOLVE THIS BUGGED LOGIC
    // Might need to start this function over because this is getting confusing.
    
    if ((previousOperand == null) && (currentOperand == null)) {
        displayValue = 'ERROR';
    } else if (currentOperator == null) {      
        currentOperator = value;
    } else {
        // previousOperator = currentOperator;
        // currentOperator = value;
        if ((currentOperand != null) && (previousOperand == null)) {
            currentOperator = value;
            previousOperand = currentOperand;
            currentOperand = null;
        } else if ((currentOperand == null) && (previousOperand != null)) {
            currentOperator = value;
        } else if ((currentOperand != null) && (previousOperand != null)) {
            operate(currentOperator, Number(previousOperand), Number(currentOperand));
            displayValue = result;
            previousOperator = currentOperator;
            currentOperator = value;
        }
    } 
    
    /* else {
        previousOperator = currentOperator;
        currentOperator = value;
        previousOperand = 
        currentOperand = null;
    } */

    console.log(`Input: ${value}\nDisplay: ${displayValue}`);
}


function inputEquals() {
    operate(currentOperator, Number(previousOperand), Number(currentOperand));
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
// Bug, 2/2/2025: Operations currently don't work.

function operate(operation, operand1, operand2) {

    console.log(`Operation: ${operation}\nFirst Operand: ${operand1}\nSecond Operand: ${operand2}`);
    if (operand1 == null) {
        // If equals is pressed when no current operand, display zero.
        result = 0;
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
                    // This will likely produce a bug where the operands are not cleared. 
                    previousOperand = null;
                    currentOperand = null;
                    previousOperator = null;
                    currentOperator = null;
                }
                result = divide(operand1, operand2);
        }
    }
    
    // Reset globals for next operation
    previousOperand = currentOperand;
    currentOperand = null;
    previousOperator = currentOperator;
    currentOperator = null;

    console.log(result);
    return result; // Should investigate whether the result should be passed through to other functions or whether this is bug prone.
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