const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");
const calculator = document.querySelector('.calculator')

function calculate(firstValue, operator, secondValue) {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);
    console.log(`num1 = ${num1} ,action: ${operator}, num2 = ${num2}`);

    if (operator === "add") {
        return num1 + num2;
    }
    else if (operator === "subtract") {
        return num1 - num2;
    }
    else if (operator === "multiply") {
        return num1 * num2;
    }
    else {
        return num1 / num2;
    }
}

keys.addEventListener("click", (e) => {
    // only handle click event for key buttons
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const previousKeyType = calculator.dataset.previousKeyType;
        const previousAction = calculator.dataset.previousAction;

        // if action is undefined, then this is a number
        if (!action) {
            // Remove .is-depressed class from all keys
            Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('is-depressed'))

            if (display.innerText === '0' || previousKeyType === "operator") {
                display.innerText = key.innerText;
            }
            else {
                display.innerText += key.innerText;
            }
            calculator.dataset.previousKeyType = "number";
        }
        // else, this is an action
        else {
            if (action === "add" ||
                action === "subtract" ||
                action === "multiply" ||
                action === "divide"
            ) {
                if (calculator.dataset.firstValue && calculator.dataset.firstValue !== "undefined") {
                    // for example: 5 + 7 * 
                    // in this case, user did not press equal and try to nest calculation
                    // after I refactor this code, 5 is the calculator.dataset.firstValue, and 7 is the display.innerText
                    // "add" is the calculator.dataset.previousAction, so we can calculate this expression and set this to be new firstValue
                    calculator.dataset.firstValue = calculate(calculator.dataset.firstValue, previousAction, display.innerText);
                    console.log(`firstValue: ${calculator.dataset.firstValue}, previousAction: ${previousAction}, display.innerText: ${display.innerText}`);
                }
                else {
                    calculator.dataset.firstValue = display.innerText;
                }

                key.classList.add("is-depressed");
                // to let the numKey know what's the previous keyType
                calculator.dataset.previousKeyType = "operator";
                // let the calculator know what's the previous action
                calculator.dataset.previousAction = action;
            }
            else if (action === "decimal") {
                if (previousKeyType === "number") {
                    display.innerText += ".";
                    calculator.dataset.previousKeyType = "decimal";
                    // calculator.dataset.previousAction = action;
                }
            }
            else if (action === "calculate") {
                if (calculator.dataset.firstValue && calculator.dataset.firstValue !== "undefined") {
                    let answer = calculate(calculator.dataset.firstValue, calculator.dataset.previousAction, display.innerText);
                    // update the firstValue of operator to be undefined
                    calculator.dataset.firstValue = undefined;
                    // update this calculated answer to the screen;
                    display.innerText = answer;
                    console.log(answer);
                }
            }
            else if (action === "clear") {
                // reset calculator state
                calculator.dataset.previousKeyType = null;
                calculator.dataset.previousAction = undefined;
                calculator.dataset.firstValue = undefined;
                display.innerText = 0;
            }
        }
    }
});