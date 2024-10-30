let num1 = 0;
let num2 = 0;
let displayValue = "0";
let currentOperator = "";
let clearScreenOnNextNumber = false;
let disableEquals = false;
const operators = ["add", "subtract", "multiply", "divide"];
const buttons = {};
const display = document.getElementById("display").querySelector("h1");
const equalsButton = document.getElementById("equals");

for (let i = 0; i < 10; i++) {
  buttons["button-" + i] = document.getElementById("button-" + i);
  buttons["button-" + i].addEventListener("click", () => {
    if (clearScreenOnNextNumber) {
      display.textContent = "";
      clearScreenOnNextNumber = false;
    }
    if (display.textContent == 0){
      display.textContent = i;
    }
    else {
      display.textContent += i;
    }
    displayValue = Number(display.textContent);
  });
}

for (operator of operators) {
  const button = document.getElementById(operator);
  button.addEventListener("click", (event) => {
    if (currentOperator && num2 === 0) {
      num2 = Number(display.textContent);
      display.textContent = operate(num1, num2, currentOperator);
      num1 = Number(display.textContent);
      num2 = 0;
      disableEquals = true;
    }
    else {
      num1 = Number(display.textContent);
      disableEquals = false;
    }
    currentOperator = event.target.id;
    clearScreenOnNextNumber = true;
  });
}

equalsButton.addEventListener("click", () => {
  if (disableEquals === false) {
    num2 = Number(display.textContent);
    display.textContent = operate(num1, num2, currentOperator);
    num1 = Number(display.textContent);
    num2 = 0;
    currentOperator = "";
    clearScreenOnNextNumber = true;
  }
})

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2)  {
  return num2 !== 0 ? num1 / num2 : "error";
}

function operate(num1, num2, operator) {
  if (operator === "add") {
    return add(num1, num2);
  }
  else if (operator === "subtract") {
    return subtract(num1, num2);
  }
  else if (operator === "multiply") {
    return multiply(num1, num2);
  }
  else if (operator === "divide") {
    return divide(num1, num2);
  }
  else {
    return "Error";
  }
}


// clear button needs programming
// percent button needs programming
// screen should only store a certain number of digits, answers should only be to so many decimal places
// decimal point button needs programming
// decimal point button needs disabling if there is already a decimal point on screen
// add keyboard support
// add backspace button?