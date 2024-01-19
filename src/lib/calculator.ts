class Calculator {
    private calculatedNum: number = 0
    private calcString: string = ''

    public constructor() {}

    public clear(): void {
        this.calculatedNum = 0
        this.calcString = ''
    }
    
    public getCalculatedNum(): number {
        return this.calculatedNum
    }

    /*
     *TODO: Need more validation for the following:
     *  - Decimals, we need to veriify the decimal doesn't appear in incorrect places, e.g. '5+2..'
     *  - Incorrect operations, if we get something like '2**+-4', this will still process
     * 
     * NOTE: An alternative to a lot of this algorithm is to use the eval() function
     */
    public processInput(inputStr: string): string {
        const firstChar = inputStr[0]
        if (!isNaN(Number(firstChar)) || firstChar === '.' && this.calcString === '') { 
            this.calculatedNum = 0
        }

        for (let i = 0; i < inputStr.length; i++) {
            const char = inputStr[i]
            if (char === '=') {
                const nextChar = inputStr[i + 1]
                if (i < inputStr.length - 1 && !isNaN(Number(nextChar)) || nextChar === '.') {
                    this.calculatedNum = 0
                } else {
                    this.calculatedNum = this.calculate(this.calcString)
                }

                this.calcString = ''
            } else {
                this.calcString += char
            }
        }

        if (inputStr[inputStr.length - 1] === '=') {
            return this.calculatedNum.toString()
        } else {
            let index = inputStr.length - 1
            let numStr = ''
            while (index >= 0) {
                const char = inputStr[index]
                if (!isNaN(Number(char)) || char === '.') {
                    numStr = char + numStr 
                } else {
                    break
                }
                index--
            }

            // I am assuming that if the input ends in an operation, we want to display that to the user
            return numStr === '' ? inputStr[inputStr.length - 1] : numStr
        }
    }

    // NOTE: An alternative to a lot of this algorithm is to use the eval() function
    public calculate(inputStr: string): number {
        this.calcString = inputStr
        if (this.calcString.length === 0) {
            return 0
        }

        const stack: number[] = [this.calculatedNum]
        let currNum = 0
        let decimalPlace = 0
        let lastOp = '+'
        for (let i = 0; i < this.calcString.length; i++) {
            const char = this.calcString[i]
            if (char === '.') {
                decimalPlace = 10
                continue
            }

            if (!isNaN(Number(char))) {
                if (decimalPlace > 0) {
                    currNum += parseInt(char) / decimalPlace
                    decimalPlace *= 10
                } else {
                    currNum = (currNum * 10) + parseInt(char)
                }
                if (i !== this.calcString.length - 1) {
                    continue
                }
            }

            decimalPlace = 0

            // If the first character is an operation, record it and continue
            if (i === 0) {
                lastOp = char
                continue
            }

            if (char === '%') {
                if (i < inputStr.length - 1) {
                    const nextChar = inputStr[i + 1]
                    if (!(!isNaN(Number(nextChar)) || nextChar === '.')) {
                        stack.push(currNum / 100)
                    }
                    continue
                }
            }

            if (lastOp === '-') {
                stack.push(currNum * -1)
            } else if (lastOp === '+') {
                stack.push(currNum)
            } else if (lastOp === '%') {
                const topNum = stack.pop()
                if (topNum === undefined) {
                    throw new Error('Cannot percentage numbers because there are no numbers entered.')
                }
                stack.push((topNum * currNum) / 100)
            } else if (lastOp === '*') {
                const topNum = stack.pop()
                if (topNum === undefined) {
                    throw new Error('Cannot multiply numbers because there are no numbers entered.')
                }
                stack.push(topNum * currNum)
            } else if (lastOp === '/') {
                const topNum = stack.pop()
                if (topNum === undefined) {
                    throw new Error('Cannot divide numbers because there are no numbers entered.')
                }
                stack.push(topNum / currNum)
            } else {
                continue
            }

            lastOp = char
            currNum = 0
        }

        if (inputStr[inputStr.length - 1] === '%') {
            const topNum = stack.pop()
            if (topNum === undefined) {
                throw new Error('Cannot percentage numbers because there are no numbers entered.')
            }
            stack.push(topNum / 100)
        }

        let result = 0
        for (const val of stack) {
            result += val
        }

        return result
    }
}

export default Calculator