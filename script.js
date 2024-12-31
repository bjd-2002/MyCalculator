document.addEventListener("DOMContentLoaded", () => {
  const numberButtons = document.querySelectorAll("[number]");
  const operandButtons = document.querySelectorAll("[operand]");
  const evaluateButton = document.querySelector("[evaluate]");
  const allClearButton = document.querySelector("[clear]");
  const displayInput = document.getElementById("display");
  const deleteButton = document.querySelector("[delete]");

  class Calculator {
    constructor(previousNumber, currentNumber) {
      this.previousNumber = previousNumber;
      this.currentNumber = currentNumber;
      this.clear();
    }

    clear() {
      this.currentNumber = "";
      this.previousNumber = "";
      this.operand = undefined;
    }

    appendNumber(number) {
      if (number === "." && this.currentNumber.includes(".")) return;
      this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    delete() {
      if (this.currentNumber === "" && this.operand === undefined) return;
      else if (this.operand !== undefined && this.currentNumber !== "") {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
      } else if (this.operand !== undefined) {
        this.operand = undefined;
        this.currentNumber = this.previousNumber;
        this.previousNumber = "";
        this.updateDisplay();
      } else this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    chooseOperation(operand) {
      if (this.currentNumber === "" && this.operand) {
        this.operand = operand; // Replace the operand
        this.updateDisplay();
        return;
      }
      if (this.currentNumber === "") return;

      if (this.previousNumber !== "") {
        this.evaluate();
      }
      // console.log(this.currentNumber);
      this.operand = operand;
      this.previousNumber = this.currentNumber;
      this.currentNumber = "";
    }

    evaluate() {
      let result;
      const prev = parseFloat(this.previousNumber);
      const current = parseFloat(this.currentNumber);

      if (isNaN(prev) || isNaN(current)) {
        this.operand = undefined;
        if (isNaN(current)) {
          this.currentNumber = prev;
          this.previousNumber = "";
        }
        this.updateDisplay();
        return;
      }

      switch (this.operand) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          if (current === 0) {
            alert("Division by zero is not allowed.");
            return;
          }
          result = prev / current;
          break;
        default:
          return;
      }

      let formattedResult = result.toFixed(2).toString();
      if (formattedResult.slice(-3) === ".00") {
        console.log(formattedResult.slice(-3));
        formattedResult = formattedResult.slice(0, -3);
      }

      this.currentNumber = formattedResult;
      this.operand = undefined;
      this.previousNumber = "";
    }

    updateDisplay() {
      displayInput.value = `${this.previousNumber}${
        this.operand ? this.operand : ""
      }${this.currentNumber}`;
    }
  }

  const calculator = new Calculator("", "");

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.textContent);
      calculator.updateDisplay();
    });
  });

  operandButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.textContent);
      calculator.updateDisplay();
    });
  });

  evaluateButton.addEventListener("click", () => {
    calculator.evaluate();
    calculator.updateDisplay();
  });

  allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });
});
