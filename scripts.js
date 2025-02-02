// --- ADDITION ---

function add(x,y) {
	let sum = x + y;
	console.log(sum);
}
// returns undefined

// add(3,4);
// 7
// returns undefined


// --- SUBTRACTION ---

function subtract(x,y) {
	let difference = x - y;
	console.log(difference);
}
// returns undefined

// subtract(10, 6);
// 4
// returns undefined


// --- MULTIPLICATION ---

function multiply(x,y) {
	let product = x * y;
	console.log(product);
}
// returns undefined

// multiply(3, 2);
// 6
// returns undefined


// --- DIVISION ---

function divide(x, y) {
	let quotient = x / y;
	console.log(quotient);
}
// returns undefined

// divide(10, 5);
// 2
// returns undefined


// --- GLOBAL VARIABLES ---

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

display.innerText = 0;
let operand1 = null;
let operand2 = null;
let operator1 = null;
let operator2 = null;
let result = null;

// --- OPERATE ---
// 1/27/2025: This section in progress. 

function operate(operation, num1, num2) {
    if (operation == '*') {
        multiply(num1, num2);
    } else if (operation == '/') {
        divide(num1, num2);
    } else if (operation == '+') {
        add(num1, num2);
    } else {
        subtract(num1, num2);
    }
}

operate(operator, operand1, operand2);


// --- DISPLAY FUNCTIONS ---
// 2/1/2025: In progress

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", updateDisplay);
}

function updateDisplayDraft1() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}

function updateDisplayDraft2(button) {  
    let button = buttons[i];
    // when button is clicked display its content
    display.innerText = button.innerText;
}

function clearDisplay() {
    display.innerText = "0";
    operand1 = null;
    operand2 = null;
    operator1 = null;
    operator2 = null;
    result = null;
}