'use client';

import React, { useState } from "react";
import { get_array } from '@/app/src/wasm/rust_wasm'
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

  const handleSizeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') { // エンターキーを押されたとき
      e.preventDefault()
      console.log(get_array(size));
    }
  }

  const handleSizeSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(get_array(size));
  }

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) { // 文字列が数字のみで構成されているかを見る
      setSize(Number(input)); // inputは文字列なので数値に変換してset
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
