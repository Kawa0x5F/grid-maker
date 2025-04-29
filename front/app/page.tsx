'use client';

import { useEffect } from "react";
import { alert_input_size } from '@/app/src/wasm/rust_wasm'
import '@/app/globals.css'

export default function Home() {
  // const [size, setSize] = useState("");
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

  useEffect(() => {
      alert_input_size(5);
  }, []);

  return (
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
  );
}
