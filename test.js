class Calculator {
    constructor(previousOperantText, currentOperantText){
        this.previousOperantText = previousOperantText;
        this.currentOperantText = currentOperantText;
        this.clear();
    }

    clear (){
        this.currentNumber = '';
        this.previousNumber = '';
        this.operant = undefined;
    }

    updateScreen(){
        this.currentOperantText.innerText =
        this.getDisplayNumber(this.currentNumber)
      if (this.operant != null) {
        this.previousOperantText.innerText =
          `${this.getDisplayNumber(this.previousNumber)} ${this.operant}`
      } else {
        this.previousOperantText.innerText = ''
      }
    }

    delete(){
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    computer(){
        let comput;
        const cur = parseFloat(this.currentNumber);
        const prev = parseFloat(this.previousNumber);
        switch(this.operant){
            case '+':
                comput = prev + cur;
                break;
            case '-':
                comput = prev - cur;
                break;
            case '*':
                comput = prev * cur;
                break;
            case '÷':
                comput = prev / cur;
                break;
            default:
                return;
        }
        this.currentNumber = comput;
        this.operant = undefined;
        this.previousNumber = '';

    }

    addNumber(number){
        if (number === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentNumber === '')return
        if(this.previousNumber !== ''){
            this.computer();
        }
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
        this.operant = operation;

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }


}




const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const delet = document.querySelector('[data-delete]')
const allClear = document.querySelector('[data-all-clear]')
const equals = document.querySelector('[data-equals]')
const previousOperantText = document.querySelector('[data-previous-operand]')
const currentOperantText = document.querySelector('[data-current-operand]')

const calculator = new Calculator (previousOperantText, currentOperantText)

numbers.forEach(button => {
    button.addEventListener ('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updateScreen();
    })
})

operations.forEach(button => {
    button.addEventListener ('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateScreen();
    })
})

allClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateScreen();
})

equals.addEventListener('click', () => {
    calculator.computer();
    calculator.updateScreen();
})

delet.addEventListener('click', () => {
    calculator.delete();
    calculator.updateScreen();
})