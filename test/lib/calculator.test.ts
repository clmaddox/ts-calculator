import Calculator from '../../src/lib/calculator'

describe('Test Calculator', () => {
    let calculator: Calculator 

    describe('Test Calculate', () => {
        beforeEach(() => {
            calculator = new Calculator()
        })

        test('test add', () => {
            expect(calculator.calculate('2+4')).toBe(6)
        })
        
        test('test add decimal', () => {
            expect(calculator.calculate('2.5+4')).toBe(6.5)
        })

        test('test subtract', () => {
            expect(calculator.calculate('2-4')).toBe(-2)
        })

        test('test multiply', () => {
            expect(calculator.calculate('2*4')).toBe(8)
        })

        test('test divide', () => {
            expect(calculator.calculate('4/2')).toBe(2)
        })
    })

    describe('Test Process Input', () => {
        beforeEach(() => {
            calculator = new Calculator()
        })

        test('test input =', () => {
            expect(calculator.processInput('2*4=')).toBe('8')
        })

        test('test input no =', () => {
            expect(calculator.processInput('2*4')).toBe('4')
        })

        test('test multiple inputs', () => {
            expect(calculator.processInput('2+4')).toBe('4')
            expect(calculator.processInput('*3')).toBe('3')
            expect(calculator.processInput('=')).toBe('14')
        })

        test('test multiply against calculated', () => {
            expect(calculator.processInput('2+4')).toBe('4')
            expect(calculator.processInput('=')).toBe('6')
            expect(calculator.processInput('*3')).toBe('3')
            expect(calculator.processInput('=')).toBe('18')
        })
    })

})