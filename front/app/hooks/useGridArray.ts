import { useState, useEffect } from 'react';
import { get_array } from '@/app/wasm/rust_wasm';

export const useGridArray = () => {
  const [inputSize, setInputSize] = useState({ row: "5", col: "5" });
  const [size, setSize] = useState({ row: 5, col: 5 });
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    const res = get_array(size.row, size.col);
    setArray(Array.from(res));
  }, [size.row, size.col]);

  const handleChangeInputSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputSize((prev) => ({ ...prev, [e.target.name]: value }));
      setIsError(false);
    }
  };

  const handleSizeSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const row = Number(inputSize.row);
    const col = Number(inputSize.col);
    if (row <= 0 || row > 100 || col <= 0 || col > 100) {
      setIsError(true);
      setErrorMessage("数値は0以上100以下で入力してください");
    } else {
      setSize({ row: row, col: col });
    }
  };

  const onCellClick =  (index: number) => {
    const newArray = [...array];
    newArray[index] = newArray[index] === 0 ? 1 : 0;
    setArray(newArray);
  }


  return {
    inputSize,
    size,
    isError,
    errorMessage,
    array,
    handleChangeInputSize,
    handleSizeSubmitButton,
    onCellClick,
  };
};
