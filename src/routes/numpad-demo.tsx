import { createFileRoute } from "@tanstack/react-router";
import React, { useRef, useState } from "react";
import NumPad from "../app/controls/components/pad-number";

export const Route = createFileRoute("/numpad-demo")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showNumpad, setShowNumpad] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastPressed, setLastPressed] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Para evitar que el numpad se cierre al pasar el foco del input al numpad
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleNumberClick = (value: string) => {
    setLastPressed(value);
    if (value === "Esc") {
      setShowNumpad(false);
    } else if (value === "Limpiar") {
      setInputValue("");
    } else {
      setInputValue((prev) => prev + value);
    }
  };

  const handleInputBlur = () => {
    // Espera un tick para ver si el foco va al numpad
    blurTimeout.current = setTimeout(() => {
      setShowNumpad(false);
    }, 100);
  };

  const handleNumpadBlur = () => {
    setShowNumpad(false);
  };

  const handleInputFocus = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
    }
    setShowNumpad(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">NumPad Demo Route</h1>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="numpad-input" className="font-semibold mb-1">
          Input solo con NumPad:
        </label>
        <input
          id="numpad-input"
          ref={inputRef}
          type="text"
          className="border rounded px-3 py-2 text-lg w-48 focus:ring-2 focus:ring-blue-400 bg-white cursor-pointer"
          value={inputValue}
          readOnly
          onFocus={handleInputFocus}
          onClick={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className="text-sm text-gray-500">Haz click o enfoca el input para abrir el NumPad</div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Last pressed:</span> {lastPressed ?? "None"}
      </div>
      <NumPad
        onNumberClick={handleNumberClick}
        show={showNumpad}
        onBlur={handleNumpadBlur}
        anchorRef={inputRef as React.RefObject<HTMLElement>}
      />
    </div>
  );
}
