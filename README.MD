# Introduction
`ts-calculator` is a simple interactive calculator implementation in typescript.

# Running ts-calculator
`ts-calculator` was built on node version `v20.10.0`, so we recommend using that. Before running `ts-calculator`, make sure to install dependencies:
```
npm install
```

To verify ts-calculator is installed properly, run the unit tests:
```
npm run test
```

If all tests pass, run the tool:
```
npm run start
```

NOTE: Running the `start` command will also generate a build. This can be found in the `build` directory.

# Supported Operations
Here is a list of operations that are supported by the calculator:
```
+: performs an addition between two numbers
-: performs a subtraction between two numbers
*: performs a multiplication between two numbers
/: performs a division between two numbers
=: calculates a result based on what operations and numbers been previoously entered
c: clears the calculator state
```