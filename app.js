const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");
const calculator = document.querySelector('.calculator')

function calculate(firstValue, operator, secondValue) {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);
    console.log(`num1 = ${num1} and num2 = ${num2}`);

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
                // save the current display value as dataset.firstValue
                key.dataset.firstValue = display.innerText;
                key.classList.add("is-depressed");
                // to let the numKey know what's the previous keyType
                calculator.dataset.previousKeyType = "operator";
            }
            else if (action === "decimal") {
                if (previousKeyType === "number") {
                    display.innerText += ".";
                    calculator.dataset.previousKeyType = "decimal";
                }
            }
            else if (action === "calculate") {
                const operators = document.querySelectorAll(".key--operator");
                let answer;
                for (let operator of operators) {
                    // this is the operator just being pressed by user
                    // if first value exists within this operator, this is a valid calculation
                    if (operator.dataset.firstValue && operator.dataset.firstValue !== "undefined") {
                        console.log(`firstValue of ${operator.dataset.action} is ${operator.dataset.firstValue}`);
                        answer = calculate(operator.dataset.firstValue, operator.dataset.action, display.innerText);
                        // update the firstValue of operator to be undefined
                        operator.dataset.firstValue = undefined;
                        // update this calculated answer to the screen;
                        display.innerText = answer;
                        console.log(answer);
                    }
                }
            }
            else if (action === "clear") {
                // reset calculator state
                calculator.dataset.previousKeyType = null;
                display.innerText = 0;
            }
        }
        // console.log(e.target.dataset.action);
    }
});