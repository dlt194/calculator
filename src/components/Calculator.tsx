"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  appendInput,
  clearInput,
  evaluateExpression,
  setOperator,
} from "../redux/calculatorSlice";

const buttons = [
  { id: "clear", label: "C", action: "clear" },
  { id: "divide", label: "/", action: "operator" },
  { id: "multiply", label: "*", action: "operator" },
  { id: "add", label: "+", action: "operator" },
  { id: "seven", label: "7", action: "number" },
  { id: "eight", label: "8", action: "number" },
  { id: "nine", label: "9", action: "number" },
  { id: "subtract", label: "-", action: "operator" },
  { id: "four", label: "4", action: "number" },
  { id: "five", label: "5", action: "number" },
  { id: "six", label: "6", action: "number" },
  { id: "equals", label: "=", action: "equals" },
  { id: "one", label: "1", action: "number" },
  { id: "two", label: "2", action: "number" },
  { id: "three", label: "3", action: "number" },
  { id: "zero", label: "0", action: "number" },
  { id: "decimal", label: ".", action: "number" },
];

export default function Calculator() {
  const dispatch = useDispatch();
  const { input } = useSelector((state: RootState) => state.calculator);

  const handleClick = (label: string, action: string) => {
    if (action === "number" || label === ".") dispatch(appendInput(label));
    if (action === "operator") dispatch(setOperator(label));
    if (action === "equals") dispatch(evaluateExpression());
    if (action === "clear") dispatch(clearInput());
  };

  return (
    <div
      id="drum-machine"
      className="container mx-auto p-4 text-center max-w-md"
    >
      <div id="display" className="mb-4 p-4 bg-gray-200 rounded-lg text-right">
        {input}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map(({ id, label, action }) => (
          <button
            key={id}
            id={id}
            className="p-4 bg-blue-600 text-white rounded-lg"
            onClick={() => handleClick(label, action)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
