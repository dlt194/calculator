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
      if (state.input === "0" && action.payload !== ".") {
        state.input = action.payload;
      } else {
        state.input += action.payload;
      }
    },
    clearInput: (state) => {
      state.input = "0";
      state.output = "0";
    },
    evaluateExpression: (state) => {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(state.input);
        state.output = result.toString();
        state.input = result.toString();
      } catch (error) {
        state.output = "Error";
      }
    },
    setOperator: (state, action) => {
      const lastChar = state.input.slice(-1);
      if ("+-*/".includes(lastChar)) {
        state.input = state.input.slice(0, -1) + action.payload;
      } else {
        state.input += action.payload;
      }
    },
  },
});

export const { appendInput, clearInput, evaluateExpression, setOperator } =
  calculatorSlice.actions;
export default calculatorSlice.reducer;
