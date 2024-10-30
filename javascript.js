let num1 = 0;
let num2 = 0;
let displayValue = "0";
let currentOperator = "";
let clearScreenOnNextNumber = false;
let disableEquals = false;
let disableDecimal = false;
const operators = ["add", "subtract", "multiply", "divide"];
const buttons = {};
const display = document.getElementById("display").querySelector("h1");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("AC");
const percentButton = document.getElementById("percent");
const decimalButton = document.getElementById("decimal-point");
const positiveOrNegativeButton = document.getElementById("positive/negative");
const MAX_DISPLAY_LENGTH = 15;

// Operation functions
const add = function (num1, num2) {
  return num1 + num2;
};
const subtract = function (num1, num2) {
  return num1 - num2;
};
const multiply = function (num1, num2) {
  return num1 * num2;
};
const divide = function (num1, num2) {
  return num2 !== 0 ? num1 / num2 : "error";
};

// Operate function with result length check
const operate = function (num1, num2, operator) {
  let result = "";
  if (operator === "add") {
    result = add(num1, num2);
  } else if (operator === "subtract") {
    result = subtract(num1, num2);
  } else if (operator === "multiply") {
    result = multiply(num1, num2);
  } else if (operator === "divide") {
    result = divide(num1, num2);
  } else {
    result = "Error";
  }
  // Check and limit the result length check
  let resultString = result.toString();
  if (resultString.length > MAX_DISPLAY_LENGTH) {
    if (result % 1 !== 0) {
      result = parseFloat(result.toFixed(MAX_DISPLAY_LENGTH - Math.floor(result).toString().length - 1));
      resultString = result.toString();
    }
    if (resultString.length > MAX_DISPLAY_LENGTH) {
      return "Error - too long";
    }
  }
  return result;
};

// Digit button event listeners
for (let i = 0; i < 10; i++) {
  buttons["button-" + i] = document.getElementById("button-" + i);
  buttons["button-" + i].addEventListener("click", () => {
    if (clearScreenOnNextNumber) {
      display.textContent = "";
      clearScreenOnNextNumber = false;
      disableDecimal = false;
    }
    if (display.textContent === "0") {
      display.textContent = i;
    }
    else if (display.textContent.length < MAX_DISPLAY_LENGTH) {
      display.textContent += i;
    }
    displayValue = Number(display.textContent);
  });
}

// Operator button event listeners
for (let operator of operators) {
  const button = document.getElementById(operator);
  button.addEventListener("click", (event) => {
    if (currentOperator) {
      num2 = Number(display.textContent);
      display.textContent = operate(num1, num2, currentOperator);
      num1 = Number(display.textContent);
      num2 = 0;
    }
    else {
      num1 = Number(display.textContent);
      disableEquals = false;
    }
    currentOperator = event.target.id;
    clearScreenOnNextNumber = true;
  });
}

// Equals button event listener
equalsButton.addEventListener("click", () => {
  if (!disableEquals) {
    num2 = Number(display.textContent);
    display.textContent = operate(num1, num2, currentOperator);
    num1 = Number(display.textContent);
    num2 = 0;
    currentOperator = "";
    clearScreenOnNextNumber = true;
    disableDecimal = false;
  }
});

// Clear button event listener
clearButton.addEventListener("click", () => {
  display.textContent = "0";
  num1 = 0;
  num2 = 0;
  currentOperator = "";
  disableDecimal = false;
});

// Percent button event listener
percentButton.addEventListener("click", () => {
  displayValue = Number(display.textContent);
  display.textContent = displayValue / 100;
  currentOperator = "";
  disableEquals = true;
});

// Positive or negative toggle button event listener
positiveOrNegativeButton.addEventListener("click", () => {
  displayValue = Number(display.textContent);
  display.textContent = -displayValue;
  currentOperator = "";
  disableEquals = true;
});

// Decimal point button event listener
decimalButton.addEventListener("click", () => {
  if (disableDecimal == false) {
    if (clearScreenOnNextNumber || display.textContent === "0") {
      display.textContent = "0.";
      clearScreenOnNextNumber = false;
    }
    else {
      display.textContent += ".";
    }
    disableDecimal = true;
    displayValue = Number(display.textContent);
  }
});