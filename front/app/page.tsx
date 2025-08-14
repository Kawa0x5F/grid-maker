'use client';

import React, { useEffect, useState } from "react";
import { get_array } from '@/app/wasm/rust_wasm'
import '@/app/globals.css'

export default function Home() {
  const [inputSize, setInputSize] = useState({ row: "5", col: "5"});
  const [size, setSize] = useState({ row: 5, col: 5 });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    const row = size.row;
    const col = size.col;

    const res = get_array(row, col);
    setArray(Array.from(res));
  }, [size.row, size.col])

  const handleChangeInputSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputSize((prev) => ({ ...prev, [e.target.name]: value }));
      setIsError(false);
    }
  }

  const handleSizeSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const row = Number(inputSize.row);
    const col = Number(inputSize.col);
    if (row <= 0 || row > 100 || col <= 0 || col > 100) {
      setIsError(true)
      setErrorMessage("数値は0以上100以下で入力してください");

    } else {
      setSize({row: row, col:col})
    
      const res = get_array(row, col);
      setArray(Array.from(res));
    }
}

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <form 
        onSubmit={handleSizeSubmitButton}
        className="flex flex-col items-center justify-center space-y-3 w-full"
      >
        <input
          name="row"
          type="text"
          id="only-number"
          value={inputSize.row}
          onChange={handleChangeInputSize}
          inputMode="numeric"
          className="border rounded px-4 py-2 w-48 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="col"
          type="text"
          id="only-number"
          value={inputSize.col}
          onChange={handleChangeInputSize}
          inputMode="numeric"
          className="border rounded px-4 py-2 w-48 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md"
        >
          決定
        </button>
      </form>
      {isError && <p className="text-red">{ errorMessage }</p>}

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div
          className={`grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-0`}
          style={{ width: 'fit-content', '--cols': size.row } as React.CSSProperties}
        >
          {array.map((value: number, index: number)=>
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
