import { createSlice } from "@reduxjs/toolkit";

interface CalculatorState {
  input: string;
  output: string;
}

const initialState: CalculatorState = {
  input: "0",
  output: "0",
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    appendInput: (state, action) => {
      const value = action.payload;

      const currentNumber = state.input.split(/[\+\-\*\/]/).pop() || "";
      if (value === "." && currentNumber.includes(".")) {
        return;
      }

      if (state.input === "0" && value !== ".") {
        state.input = value;
      } else {
        state.input += value;
      }
    },
    clearInput: (state) => {
      state.input = "0";
      state.output = "0";
    },
    evaluateExpression: (state) => {
      try {
        const result = eval(state.input);
        state.output = result.toString();
        state.input = result.toString();
      } catch (error) {
        state.output = "Error";
        console.log(error);
      }
    },
    setOperator: (state, action) => {
      const operator = action.payload;
      const lastChar = state.input.slice(-1);

      // Handle consecutive operators, allowing a single negative sign
      if ("+-*/".includes(lastChar)) {
        if (operator === "-" && lastChar !== "-") {
          // Allow a negative sign after an operator
          state.input += operator;
        } else if (operator !== "-") {
          // Replace the last operator with the new one
          state.input = state.input.replace(/[\+\-\*\/]+$/, operator);
        }
      } else {
        state.input += operator;
      }
    },
  },
});

export const { appendInput, clearInput, evaluateExpression, setOperator } =
  calculatorSlice.actions;
export default calculatorSlice.reducer;
