'use client';

import { useState } from "react";
import { alert_input_size } from '@/app/src/wasm/rust_wasm'
import '@/app/globals.css'

export default function Home() {
  const [size, setSize] = useState(0);
  const arr = [
    {name: 'a',},
    {name: 'b',},
    {name: 'c',},
    {name: 'd',},
    {name: 'e',},
    {name: 'f',},
    {name: 'g',},
    {name: 'h',},
    {name: 'i',},
    {name: 'j',},
  ]

  const handleSizeKeyDown = (e) => {
    if (e.key == 'Enter') { // エンターキーを押されたとき
      alert_input_size(size);
    }
  }

  const handleSizeSubmitButton = (e) => {
    alert_input_size(size);
  }

  const handleChangeSize = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setSize(input);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <form 
        onSubmit={handleSizeSubmitButton}
        className="flex flex-col items-center justify-center space-y-3 w-full"
      >
        <input
          type="text"
          id="only-number"
          inputMode="numeric"
          onChange={handleChangeSize}
          onKeyDown={handleSizeKeyDown}
          className="border rounded px-4 py-2 w-48 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md"
        >
          決定
        </button>
      </form>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div
          className={`grid grid-cols-5 gap-0`}
          style={{ width: 'fit-content' }}
        >
          {arr.map((value: {name: string;}, index: number)=>
            <div
              key={`${value}_${index}`}
              className="w-16 h-16 bg-white border border-gray-300 hover:bg-gray-200"
            />
          )}
        </div>
      </div>
    </div>
  );
}
