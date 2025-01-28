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

// --- OPERATE ---
// 1/27/2025: This section in progress. 

let operand1;
let operand2;
let operator;

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