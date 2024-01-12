import { createInterface } from "readline"
import Calculator from "./lib/calculator"

const calculator = new Calculator()
const rl = createInterface({ input: process.stdin, output: process.stdout })

console.log(0)

rl.prompt()

// TODO: Determine what to do if a string like '2+c5' is passed in
rl.on('line', (line) => {
  // Remove any unwanted characters
  const trimmedLine = (line.trim()).replace(/[^0-9c=\.+\-*\/]/g, '')
  switch (trimmedLine) {
    case 'c':
      calculator.clear()
      console.log(calculator.getCalculatedNum())
      break
    case '':
      // TODO: Consider displaying the calcString here as well, so the user knows what they have entered
      console.log(calculator.getCalculatedNum())
      break
    default:
      console.log(calculator.processInput(trimmedLine))
      break
  }
  rl.prompt()
}).on('close', () => {
  process.exit(0)
})