// script.js

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    const result = document.getElementById('result');
    const history = document.getElementById('history');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    const themeToggle = document.getElementById('toggle-theme');
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            switch (value) {
                case 'clear':
                    currentInput = '';
                    previousInput = '';
                    operator = '';
                    history.textContent = '';
                    result.textContent = '0';
                    break;
                case 'backspace':
                    currentInput = currentInput.slice(0, -1);
                    result.textContent = currentInput || '0';
                    break;
                case '=':
                    if (currentInput && previousInput) {
                        currentInput = evaluate(previousInput, currentInput, operator);
                        history.textContent = `${previousInput} ${operator} ${currentInput}`;
                        result.textContent = currentInput;
                        previousInput = '';
                        operator = '';
                    }
                    break;
                case 'sqrt':
                    if (currentInput) {
                        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                        result.textContent = currentInput;
                    }
                    break;
                case 'sin':
                    if (currentInput) {
                        currentInput = Math.sin(parseFloat(currentInput) * Math.PI / 180).toString();
                        result.textContent = currentInput;
                    }
                    break;
                case 'cos':
                    if (currentInput) {
                        currentInput = Math.cos(parseFloat(currentInput) * Math.PI / 180).toString();
                        result.textContent = currentInput;
                    }
                    break;
                case 'tan':
                    if (currentInput) {
                        currentInput = Math.tan(parseFloat(currentInput) * Math.PI / 180).toString();
                        result.textContent = currentInput;
                    }
                    break;
                case 'log':
                    if (currentInput) {
                        currentInput = Math.log10(parseFloat(currentInput)).toString();
                        result.textContent = currentInput;
                    }
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    if (currentInput) {
                        if (previousInput) {
                            currentInput = evaluate(previousInput, currentInput, operator);
                        }
                        operator = value;
                        previousInput = currentInput;
                        currentInput = '';
                    }
                    break;
                default:
                    if (currentInput.includes('.') && value === '.') return;
                    currentInput += value;
                    result.textContent = currentInput;
                    break;
            }
        });
    });

    function evaluate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return b;
        }
    }
});